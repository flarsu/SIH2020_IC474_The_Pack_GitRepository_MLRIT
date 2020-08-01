import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
  providers: [MessageService],

})
export class TranslateComponent implements OnInit {

  uploadedFiles: any[] = [];
  cities: City[];

  selectedCity: City;

  constructor(private messageService: MessageService) {
    this.cities = [
      {name: 'Afrikaans', code: 'af'},
      {name: 'Albanian', code: 'sq'},
      {name: 'Arabic', code: 'ar'},
      {name: 'Armenian', code: 'hy'},
      {name: 'Azerbaijani', code: 'az'},
      {name: 'Basque', code: 'eu'},
      {name: 'Belarusian', code: 'be'},
      {name: 'Bengali', code: 'bn'},
      {name: 'Bosnian', code: 'bs'},
      {name: 'Bulgarian', code: 'bg'},
      {name: 'Catalan', code: 'ca'},
      {name: 'Cebuano', code: 'ceb'},
      {name: 'Chichewa', code: 'ny'},
      {name: 'Chinese Simplified', code: 'zh-cn'},
      {name: 'Chinese Traditional', code: 'zh-tw'},
      {name: 'Corsican', code: 'co'},
      {name: 'Czech', code: 'cs'},
      {name: 'Danish ', code: 'da'},
      {name: 'Dutch', code: 'nl'},
      {name: 'English', code: 'en'},
      {name: 'Esperanto', code: 'eo'},
      {name: 'Estonian', code: 'et'},
      {name: 'Filipino', code: 'tl'},
      {name: 'Finnish', code: 'fi'},
      {name: 'French', code: 'fr'},
      {name: 'Frisian', code: 'fy'},
      {name: 'Galician', code: 'gl'},
      {name: 'Georgian', code: 'ka'},
      {name: 'German', code: 'de'},
      {name: 'Gujarati', code: 'gu'},
      {name: 'Haitian Creole ', code: 'ht'},
      {name: 'Hausa', code: 'ha'},
      {name: 'Hawaiian', code: 'haw'},
      {name: 'Hebrew', code: 'iw'},
      {name: 'Hindi', code: 'hi'},
      {name: 'Hmong', code: 'hmn'},
      {name: 'Hungarian', code: 'hu'},
      {name: 'Icelandic', code: 'is'},
      {name: 'Igbo', code: 'ig'},
      {name: 'Indonesian', code: 'id'},
      {name: 'Irish', code: 'ga'},
      {name: 'Italian', code: 'it'},
      {name: 'Japanese', code: 'ja'},
      {name: 'Javanese', code: 'jw'},
      {name: 'Kannada', code: 'kn'},
      {name: 'Kazakh', code: 'kk'},
      {name: 'Khmer', code: 'km'},
      {name: 'Korean', code: 'ko'},
      {name: 'Kurdish (Kurmanji)', code: 'ku'},
      {name: 'Indonesian', code: 'id'},
      {name: 'Kyrgyz', code: 'ky'},
      {name: 'Lao', code: 'lo'},
      {name: 'Latin', code: 'la'},
      {name: 'Latvian', code: 'lv'},
      {name: 'Lithuanian', code: 'lt'},
      {name: 'Luxembourgish', code: 'lb'},
      {name: 'Macedonian', code: 'mk'},
      {name: 'Malagasy', code: 'mg'},
      {name: 'Malay', code: 'ms'},
      {name: 'Malayalam', code: 'ml'},
      {name: 'Maltese', code: 'mt'},
      {name: 'Maori', code: 'mi'},
      {name: 'Marathi', code: 'mr'},
      {name: 'Mongolian', code: 'mn'},
      {name: 'Myanmar (Burmese)', code: 'my'},
      {name: 'Nepali', code: 'ne'},
      {name: 'Pashto', code: 'ps'},
      {name: 'Persian', code: 'fa'},
      {name: 'Polish', code: 'pl'},
      {name: 'Portuguese', code: 'pt'},
      {name: 'Punjabi', code: 'ma'},
      {name: 'Romanian', code: 'ro'},
      {name: 'Russian', code: 'ru'},
      {name: 'Samoan', code: 'sm'},
      {name: 'Scots Gaelic', code: 'gd'},
      {name: 'Serbian', code: 'sr'},
      {name: 'Sesotho', code: 'st'},
      {name: 'Shona', code: 'sn'},
      {name: 'Sindhi', code: 'sd'},
      {name: 'Sinhala', code: 'si'},
      {name: 'Slovak', code: 'sk'},
      {name: 'Slovenian', code: 'sl'},
      {name: 'Somali', code: 'so'},
      {name: 'Spanish', code: 'es'},
      {name: 'Sudanese', code: 'su'},
      {name: 'Swahili', code: 'sw'},
      {name: 'Swedish', code: 'sv'},
      {name: 'Tajik', code: 'tg'},
      {name: 'Tamil', code: 'ta'},
      {name: 'Telugu', code: 'te'},
      {name: 'Thai', code: 'th'},
      {name: 'Turkish', code: 'tr'},
      {name: 'Ukrainian', code: 'uk'},
      {name: 'Urdu', code: 'ur'},
      {name: 'Uzbek', code: 'uz'},
      {name: 'Vietnamese', code: 'vi'},
      {name: 'Welsh', code: 'cy'},
      {name: 'Xhosa', code: 'xh'},
      {name: 'Yiddish', code: 'yi'},
      {name: 'Yoruba', code: 'yo'},
      {name: 'Zulu', code: 'zu'}
    ];
  }

  ngOnInit(): void {
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    // apply OCR api here
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
