import { ElementRef, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export enum MediaStreamType {
  audio,
  video,
  all
};

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaDevicesInfos: MediaDeviceInfo[] = [];
  public selectedAudioOutputId = new BehaviorSubject<string>('');
  public selectedVideoInputId = new BehaviorSubject<string>('');
  public selectedAudioInputId = new BehaviorSubject<string>('');
  public lastStream?: MediaStream;


  constructor() { }


  public set audioInputId(id: string) {
    this.selectedAudioInputId.next(id);
  }
  
  public set audioOutputId(id: string) {
    this.selectedAudioOutputId.next(id);
  }

  public set videoInputId(id: string) {
    this.selectedVideoInputId.next(id);
  }

  async getMediaSources(kind: MediaDeviceKind) {
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    this.mediaDevicesInfos = await navigator.mediaDevices.enumerateDevices();
    // await navigator.mediaDevices.getUserMedia({ audio: false, video: false });
    return this.mediaDevicesInfos.filter(mdi => mdi.kind === kind);
  }

  async setSinkID(element: HTMLMediaElement, deviceId: string) {
    try {
      await (element as any).setSinkId(deviceId);
    } catch (error) {
      console.log(error);
    }
  }

  async getMediaStream(type: MediaStreamType, videoWidth?: number, videoHeight?: number, videoDeviceId?: string, audioDeviceId?: string ) {
    const constraints: MediaStreamConstraints = {
      audio: false,
      video: false
    };
    if (type === MediaStreamType.audio || type === MediaStreamType.all) {
      constraints.audio = true;
      if (audioDeviceId) {
        constraints.audio = {
          deviceId: audioDeviceId
        }
      }
    }
    if (type === MediaStreamType.video || type === MediaStreamType.all) {
      constraints.video = true;
      if ((videoHeight && videoWidth) || videoDeviceId) {
        constraints.video = {
          width: videoWidth,
          height: videoHeight,
          deviceId: videoDeviceId
        };
      }
    }
    this.lastStream = await navigator.mediaDevices.getUserMedia(constraints);
    return this.lastStream;
  }
}