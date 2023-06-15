import { environment, hold } from './../../../environments/environment';
import { EntLastLoginService } from './../../services/entity/ent-last_login.service';
import { TcmedCookieService } from './../../services/outros/tcmed-cookie.service';
import { UsuarioService } from './../../services/api/usuario.service';
import { HelperService } from './../../services/outros/helper.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../classes/usuario';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LastLogin } from 'src/app/classes/last-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Declara e instancia a classe usuário
  usuario: Usuario;
  lastLogin: any;
  ambienteDev: string = environment.tipoAcesso === 'dev' ? ' Ambiente de Desenvolvimento' : ' Servidor Online';
  holdVila: number = hold.vila;
  holdTcmed: number = hold.tcmed;
  userData: Usuario;
  loading: any;

  constructor(
    private usuarioService: UsuarioService,
    private helper: HelperService,
    private loadingCtrl: LoadingController,
    public  router: Router,
    private cookie: TcmedCookieService,
    private entLastLogin: EntLastLoginService,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });
    this.usuario = new Usuario();
  }

  // Valida o form antes de fazer o submit
  form = new FormGroup({
    email:     new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password:       new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
  });

  ngOnInit() {
  }

  /**
   * Ao abrir page Login seta o cookie de Vila
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-07-2020
   * @version 1.0
   */
  ionViewWillEnter() {
    this.helper.deleteLocalStorage('userData');
    if (!this.usuario.email) {
      this.cookie.setCookies(this.holdVila);
    }
  }

  /**
   * Botão submit para a tentativa de Login
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-07-2020
   * @version 1.0
   * @param usuario Usuario
   */
  async onSubmit(usuario: Usuario) {
    this.loading = await this.loadingCtrl.create({message: 'Logando....'});
    await this.loading.present();
    await this.login(usuario, this.holdVila);
    setTimeout(() => {  this.login(usuario, this.holdTcmed); }, 3000);
  }

  /**
   * Tenta fazer o login nas duas Holds
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-07-2020
   * @version 1.0
   * @param usuario Usuario
   * @param sistema number
   */
  async login(usuario: Usuario, sistema: number) {
    let retorno: any;
    this.usuarioService.login(usuario, sistema).subscribe(
      async token => {
        retorno = token;
        retorno.loginStatus = 'fail';
        if (retorno.error !== undefined && !retorno.error) {
          if (retorno.idMedico !== undefined && retorno.idMedico !== '-') {
            this.userData = await this.helper.getLocaStoragetoObject('userData');
            retorno.loginStatus  = sistema === this.holdVila ? 'vilaOk' : 'fail';
            // LoginStatus 'Success' caso tenha logado em Vila
            if (this.userData && sistema === this.holdTcmed && this.userData.loginStatus === 'vilaOk') {
              retorno.loginStatus = 'success';
            }
            retorno.password = usuario.password;
            // Trata o Id do médico
            await this.trataDataIdMedico(retorno, sistema);
            // Salva o retorno no Local storage para acessar os dados em options-tcmed
            localStorage.setItem('userData', JSON.stringify(retorno));
            // Salva o último login caso o LoginStatus seja 'success'
            await this.saveLastLogin(retorno, sistema);
          } else {
            this.loading.dismiss();
            await this.helper.toast('Falha', 'O usuário deve ser médico para sincronizar os dados', 'danger', 'middle', 3000);
          }
        } else {
          this.loading.dismiss();
          await this.helper.toast('Falha', 'Usuário ou senha inválidos', 'danger', 'middle', 3000);
        }
      },
      async () => {
        this.loading.dismiss();
        await this.helper.toast('Falha', 'Erro na conexão entre API e Servidor', 'danger', 'middle', 3000);
      }
    );
    // this.form.reset();
  }

  /**
   * Salva dados de login para ser usado no Off-Line
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-07-2020
   * @version 1.0
   * @param data any
   * @param sistema number
   */
  async saveLastLogin(data: any, sistema: number) {
    this.userData = await this.helper.getLocaStoragetoObject('userData');
    const lastLogin: LastLogin = new LastLogin();

    lastLogin.id_usuario    = data.idUsuario;
    lastLogin.created_at    = data.createdAt;
    lastLogin.email_usuario = data.emailUsuario;
    lastLogin.nickname      = data.nickname;
    lastLogin.nome_usuario  = data.nomeUsuario;
    lastLogin.referencia    = data.referencia;
    lastLogin.role          = data.role;
    lastLogin.situacao      = data.situacao;
    lastLogin.status        = data.status;
    lastLogin.tipo          = data.tipo;
    lastLogin.login_date    = this.helper.dateTime();
    // Salva o ultimo login somente quando logar em Vila e Tcmed corretamente
    if (sistema === this.holdTcmed) {
      lastLogin.id_medico_tcmed = data.idMedicoTcmed;
      lastLogin.id_medico_vila = data.idMedicoVila;
      // Verifica se o status de Login foi success, ou seja, tanto em vila como em tcmed
      if (this.userData.loginStatus !== undefined && this.userData.loginStatus === 'success') {
        await this.entLastLogin.save(lastLogin);
        this.loading.dismiss();
        await this.helper.toast('Sucesso', 'Logado com sucesso', 'success', 'bottom', 3000);
        this.router.navigate(['./options-tcmed']);
      } else {
        this.loading.dismiss();
        await this.helper.toast('Erro', 'Erro na tentativa de logar em algum dos servidores', 'danger', 'middle', 3000);
      }
    }
  }

  /**
   * grava os ids médicos de vila e tcmed, busca o ID de Vila no Storage
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-07-2020
   * @version 1.0
   * @param data any
   * @param sistema number
   */
  async trataDataIdMedico(data: any, sistema: number) {
    if (this.userData && sistema === this.holdTcmed) {
      data.idMedicoVila     = this.userData.idMedico;
      data.idMedicoTcmed    = data.idMedico;
    }
    return data;
  }

  /**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  backPage() {
    this.router.navigate(['/home']);
  }

}
