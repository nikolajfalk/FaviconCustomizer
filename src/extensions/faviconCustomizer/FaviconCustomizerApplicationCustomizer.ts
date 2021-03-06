import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'FaviconCustomizerApplicationCustomizerStrings';

const LOG_SOURCE: string = 'FaviconCustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFaviconCustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  faviconpath: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class FaviconCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<IFaviconCustomizerApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    let url: string = this.properties.faviconpath;
    if (!url) {
      Log.info(LOG_SOURCE, 'Fav icon URL is missing');
    }else{
        var link = document.querySelector("link[rel*='icon']") as HTMLElement || document.createElement('link') as HTMLElement;
        link.setAttribute('type', 'image/x-icon');
        link.setAttribute('rel', 'shortcut icon');
        link.setAttribute('href', url);
        document.getElementsByTagName('head')[0].appendChild(link);
        //$("link[rel='shortcut icon']").attr("href",url);
    }
 
    return Promise.resolve();
  }
}
