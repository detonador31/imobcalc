import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HelperService } from '../outros/helper.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela bloco
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
export abstract class EntAbstract {

  // Busca um array da Classe e converte em Obj Json
  entObject: any = null;
  tableName: string = null;
  public db: DatabaseService;
  public helper: HelperService;
  public datepipe: DatePipe; 


  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco Bloco
   */
  abstract save(entity: any);

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco Bloco
   */
  abstract insert(entity: any);

  /**
   * Update do registro no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco Bloco
   */
  abstract update(entity: any);

  /**
   * Exclui um registro
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param id number
   */
  abstract delete(id: number);

  /**
   * Exclui todos os blocos dentro de um array
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   * @param blocos: Bloco[]
   */
  abstract deleteMany(entity: any[]);

  /**
   * Carrega um registro conforme ID
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param id number
   */
  abstract getItem(id: number);

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
  abstract getAll();

}

