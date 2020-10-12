// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  vilaUrlDev: 'http://192.168.1.164:3000/api',
  tcmedUrlDev: 'http://192.168.1.164:5000/api',
  // Url de APIs para o sistema Vila Velha e Tecnomed
  vilaUrl: 'https://tecmed.vilavelha.com.br/api',
  tcmedUrl: 'https://newsis.tcmed.com.br/api',
  // Altera Tipo de acesso definir ( dev ) ou ( onLine )
  tipoAcesso: 'dev',
  medicoId: null
};

// Armazena as Holds como parâmetro
export const hold = {
  vila:  1,
  tcmed: 2
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
