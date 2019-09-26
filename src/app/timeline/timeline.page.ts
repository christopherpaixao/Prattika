import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject  } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/File/ngx';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage {

  myVideo: any;
  mediaFiles = [];
  

  slidesOptions = {
    slidesPerView: 3
  };

  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture,
    private storage: Storage, private media: Media, private file: File) {

  }

  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    });
  }

  captureAudio() {
    this.mediaCapture.captureAudio().then(res => {
      this.storeMediaFiles(res);
    });
  }

  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    }
    this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
      let capturedFile = res[0];
      console.log('my file:', capturedFile);
      
      let fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');
      var toDirectory = this.file.dataDirectory;

      this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(res => {
        let url = res.nativeURL.replace(/^file:\/\//, '');
        this.storeMediaFiles([{ name: fileName, size: capturedFile.size, localURL: url }]);
      });
    });
  }

  play(myFile) {
    console.log('play', myFile);
    if (myFile.name.indexOf('.wav') > -1) {
      const audioFile: MediaObject = this.media.create(myFile.localURL);
      audioFile.play();
    } else {
      let path = this.file.dataDirectory + myFile.name;
      let url = path.replace(/^file:\/\//, '');
      let video = this.myVideo.nativeElement;
      video.src = url;
      video.play();
    }
  }

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }

}
