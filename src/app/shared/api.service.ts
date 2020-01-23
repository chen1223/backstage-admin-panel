import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint = environment.endpoint;
  constructor() { }

  API = {
    /** Login / Logout **/
    login: `${this.endpoint}/login`,
    logout: `${this.endpoint}/logout`,

    /** Profile **/
    profile: `${this.endpoint}/profile`,

    /** Role **/
    roles: `${this.endpoint}/roles`,

    /** Reel **/
    reel: `${this.endpoint}/reel`,

    /** Category **/
    categories: `${this.endpoint}/categories`,

    /** Video **/
    video: `${this.endpoint}/video`,
    videos: `${this.endpoint}/videos`,
    videoStatus: `${this.endpoint}/video/status`,
  };
}
