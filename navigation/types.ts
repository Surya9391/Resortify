export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  WasteIdentification: undefined;
  ResourceHub: undefined;
  VoiceAssistant: undefined;
  BinFillReminder: undefined;
  RecycleTips: undefined;
  AllbinLocator: undefined;
  Collection: undefined;
  RecycleRate: undefined;
  Graph: undefined;
  About: undefined;
  Contact: undefined;
  MapView: {
    latitude: number;
    longitude: number;
    zoom?: number;
  };
  NotificationCenter: undefined;
  WebView: { url: string };
  ResourceDetail: {
    id: string;
    title: string;
    content: string;
    source: string;
    date: string;
    type: 'article' | 'video' | 'act';
    url?: string;
    thumbnail?: string;
    additionalInfo?: {
      keyPoints: string[];
      implementation: string;
      penalties?: string;
      amendments?: string[];
      relatedActs?: string[];
      downloadLink?: string;
    };
  };
}; 