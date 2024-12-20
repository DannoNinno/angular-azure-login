import localeCl from '@angular/common/locales/es-CL';
import localeClExtra from '@angular/common/locales/extra/es-CL';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './component/shared/loader/loader.component';
import { filter } from 'rxjs';
import { SessionStorageService } from 'angular-web-storage';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ConexionMaestraService } from './service/maestro/conexion-maestra.service';
import { WebSocketService } from './service/impresora/web-socket-impresora.service';
import { CoreEventsService } from './service/core/core-events.service';
import { ParametrosService } from './service/parametros/parametros.service';
import { IdleTimeoutComponent } from './component/shared/idle-timeout/idle-timeout/idle-timeout.component';
import { registerLocaleData } from '@angular/common';
import { PARAMETROS_IDLE } from './interface/idle-timeout/idle-timeout.interface';
import { Constants } from './utils/constants';
import { msalInstance } from './service/auth/msal.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, IdleTimeoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('footer') footer: ElementRef<HTMLElement> | undefined;
  tiempoInactividad = '36000';
  tiempoAdvertencia = '1200';
  title = 'web-admision-urgencia';
  version = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public storage: SessionStorageService,
    private conexionMaestra: ConexionMaestraService,
    private webSocketService: WebSocketService,
    private router: Router,
    private coreSrv: CoreEventsService,
    private parametrosService: ParametrosService,
  ) // public listasServicios: ListasServicios
  {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        console.log('this.coreSrv.historial :>> ', this.coreSrv.historial);
        this.coreSrv.historial = [...this.coreSrv.historial, urlAfterRedirects];
      });

    // const cnf = this.conexionMaestra.ConfStorage as BrowserStorageOptions;
    // this.storage.configure(cnf);
    this.matIconRegistry.addSvgIcon('tarjeta', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/mediosPagos/ic-mp-tarjeta.svg'));
    this.matIconRegistry.addSvgIcon(
      'efectivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/mediosPagos/ic-mp-efectivo.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'documento_bancario',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/mediosPagos/ic-mp-doc-bancario.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'documentos',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/mediosPagos/ic-mp-documento.svg'),
    );
    this.matIconRegistry.addSvgIcon('bono', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/mediosPagos/ic-mp-bono.svg'));
    this.matIconRegistry.addSvgIcon(
      'announcement',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/announcement-24px.svg'),
    );
    this.matIconRegistry.addSvgIcon('cancel', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/cancel-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'check_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/check_circle-24px.svg'),
    );
    this.matIconRegistry.addSvgIcon('edit', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/edit-24px.svg'));
    this.matIconRegistry.addSvgIcon('file_copy', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/file_copy-24px.svg'));
    this.matIconRegistry.addSvgIcon('info', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/info-24px.svg'));
    this.matIconRegistry.addSvgIcon('launch', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/launch-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'local_post_office',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/local_post_office-24px.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'location_on',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/location_on-24px.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'person_outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/person_outline-24px.svg'),
    );
    this.matIconRegistry.addSvgIcon('person', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/person-24px.svg'));
    this.matIconRegistry.addSvgIcon('phone', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/phone-24px.svg'));
    this.matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/search-24px.svg'));
    this.matIconRegistry.addSvgIcon('smartphone', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/smartphone-24px.svg'));
    this.matIconRegistry.addSvgIcon('menos', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/menos-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'franquear-cheque',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/franquear-cheque.svg'),
    );
    this.matIconRegistry.addSvgIcon('llenar-cheque', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/llenar-cheque.svg'));
    this.matIconRegistry.addSvgIcon('voucher', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/voucher.svg'));
    this.matIconRegistry.addSvgIcon(
      'reimprimir-voucher',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/reimprimir-voucher.svg'),
    );
    this.matIconRegistry.addSvgIcon('block', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/block-24px.svg'));
    this.matIconRegistry.addSvgIcon('more-vertical', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/more-vertical.svg'));
    this.matIconRegistry.addSvgIcon('printer', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/printer.svg'));
    this.matIconRegistry.addSvgIcon(
      'list-alt',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/list_alt_black_24dp.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'more-vert',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/more_vert_black_24dp.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'note-add',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/note_add_white_24dp.svg'),
    );
    this.matIconRegistry.addSvgIcon('delete', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/delete_black_24dp.svg'));
    this.matIconRegistry.addSvgIcon(
      'scanner',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/document_scanner_white_24dp.svg'),
    );
    this.matIconRegistry.addSvgIcon('apps', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/apps-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'dowload_reporte',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/dowload_reporte.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'download_ir_reporte',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/download_ir_reporte.svg'),
    );
    this.matIconRegistry.addSvgIcon('comparison', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/comparison-24px.svg'));
    this.matIconRegistry.addSvgIcon('left_arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/left-arrow.svg'));
    this.matIconRegistry.addSvgIcon('mode_edit', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/iconos/mode_edit-24px.svg'));
  }

  //title = 'Admision'; CUAL TÍTULO VA?

  async ngOnInit() {
    await msalInstance.initialize();
    this.version = this.conexionMaestra.versionAplicacion;
    registerLocaleData(localeCl, 'es-CL', localeClExtra);
    this.storage.set('evitarcierrebrowserBack', true);

    const inactividad = await this.parametrosService.getParametroPorDescripcion(PARAMETROS_IDLE.INACTIVIDAD);
    const advertencia = await this.parametrosService.getParametroPorDescripcion(PARAMETROS_IDLE.ADVERTENCIA);

    this.tiempoInactividad = inactividad && inactividad[0] && inactividad[0].value ? inactividad[0].value : Constants.TIEMPO_INACTIVIDAD;
    this.tiempoAdvertencia = advertencia && advertencia[0] && advertencia[0].value ? advertencia[0].value : Constants.TIEMPO_ADVERTENCIA;

    this.storage.set(PARAMETROS_IDLE.INACTIVIDAD, Number(this.tiempoInactividad));
    this.storage.set(PARAMETROS_IDLE.ADVERTENCIA, Number(this.tiempoAdvertencia));

    if (this.router.url) {
      const url = this.router.url.split('/');
      const length = url.length;
      let pathArray = url.slice(length - 2);
      let path = pathArray.join('/');
      if (path === '/admision') {
        this.storage.remove('sucursalSeleccionada');
        this.storage.remove('subambitoSeleccionado');
        this.storage.remove('sucursalNombre');
        this.storage.remove('currentUser');
        //this.router.navigate(['/main']); // TODO: Cuando se agregue main
      }
    }
  }

  triggerFalseClick() {
    console.log('Triggering false click');
    const el: HTMLElement | undefined = this.footer?.nativeElement;
    if (!el) throw new Error('Problema con obtener el footer');
    el.click();
  }

  later(delay: number | undefined, value: any) {
    return new Promise((resolve) => setTimeout(resolve, delay, value));
  }
}
