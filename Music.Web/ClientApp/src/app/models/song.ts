import { Artist } from "./artist";

export class Song {
  public songId: string;
  public title: string;
  public artist: Artist;
  public genre: string;
  public visited: boolean;
}
