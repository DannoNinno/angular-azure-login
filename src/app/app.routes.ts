import { Routes } from '@angular/router';
import { LocationsComponent } from './component/locations/locations.component';
import { PathMenu } from './enum/roles-menu/path-menu.enum';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  //   { path: 'auth', component: AuthComponent },
  { path: '', component: AppComponent, canActivate: [AuthGuard] }, // Protege la ruta raíz
  { path: '**', redirectTo: '' },
  //    { path: '', redirectTo: '/main', pathMatch: 'full' },
  //    { path: 'main', component: MainComponent, canActivate: [MsalGuard] },
  {
    path: 'admision',
    component: LocationsComponent,
    canActivate: [AuthGuard],
    //        canActivate: [MsalGuard, MenuGuard],
    data: { path: PathMenu.ADMISION },
  },
  // {
  //     path: 'admision',
  //     loadChildren: () => import(`./components/admision/admision.module`).then((m) => m.AdmisionModule),
  //     data: { activeTab: 'admision', path: PathMenu.ADMISION },
  //     canActivate: [MsalGuard, PerfilGuard, MenuGuard],
  // },
  // {
  //     path: 'historial',
  //     loadChildren: () => import(`./components/historial/historial.module`).then((m) => m.HistorialModule),
  //     data: { activeTab: 'historial', path: PathMenu.HISTORIAL },
  //     canActivate: [MsalGuard, PerfilGuard, MenuGuard],
  // },
  // {
  //     path: 'operaciones',
  //     loadChildren: () => import(`./components/operaciones/operaciones.module`).then((m) => m.OperacionesModule),
  //     data: { activeTab: 'operaciones' },
  //     canActivate: [MsalGuard, PerfilGuard],
  // },
  // {
  //     path: 'recaudaciones',
  //     loadChildren: () =>
  //         import(`./components/recaudaciones/recaudaciones.module`).then((m) => m.RecaudacionesModule),
  //     data: { activeTab: 'recaudaciones', path: PathMenu.RECAUDACIONES },
  //     canActivate: [MsalGuard, PerfilGuard, MenuGuard],
  // },
  // { path: 'retorno:idCliente', component: RetornoClienteComponent },
  // {
  //     path: 'nueva/admision',
  //     component: LimpiarAdmisionComponent,
  //     data: { activeTab: 'admision' },
  //     canActivate: [MsalGuard],
  // },
  // {
  //     path: 'nueva/operaciones',
  //     component: LimpiarOperacionesComponent,
  //     data: { activeTab: 'operaciones' },
  //     canActivate: [MsalGuard],
  // },
  // {
  //     path: 'menu-reportes-dashboard',
  //     loadChildren: () => import('./components/menu-reportes/menu-reportes.module').then((m) => m.MenuReportesModule),
  //     data: { activeTab: 'menu-reportes-dashboard' },
  //     canActivate: [MsalGuard],
  // },
];
