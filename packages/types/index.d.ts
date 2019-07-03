import { Document, Types as MongooseTypes } from 'mongoose';
import { Omit } from 'utility-types';
import { GuildMember } from 'discord.js';

declare module '@caravan/buddy-reading-types' {
  type SubtractKeys<T, U> = {
    [K in keyof T]: K extends keyof U ? never : K
  }[keyof T];
  type Subtract<T, U> = { [K in SubtractKeys<T, U>]: T[K] };
  export type FilterAutoMongoKeys<Base> = Subtract<
    Subtract<Base, MongoTimestamps>,
    DocumentFields
  >;
  // TODO: Improve by nesting the SameKeysAs
  export type SameKeysAs<Base> = { [Key in keyof Base]: any };

  export interface DocumentFields {
    _id: string;
    __v?: number;
  }

  export interface MongoTimestamps {
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  export interface Club extends DocumentFields, MongoTimestamps {
    name: string;
    ownerId: string;
    ownerDiscordId?: string;
    shelf: ShelfEntry[];
    bio?: string;
    members: GuildMember[];
    maxMembers: number;
    vibe?: GroupVibe;
    readingSpeed?: ReadingSpeed;
    channelSource: ChannelSource;
    channelId: string;
    private: boolean;
  }

  export interface GroupMember extends DocumentFields, MongoTimestamps {
    userId: string;
    role: string;
  }

  export interface Session extends DocumentFields {
    accessToken: string;
    /** Milliseconds since January 1st, 1970 (use Date.now() to get current value) */
    accessTokenExpiresAt: number;
    refreshToken: string;
    scope: string;
    tokenType: 'Bearer';
    client: string;
    userId: string;
  }

  export interface ShelfEntry extends DocumentFields, MongoTimestamps {
    amazonId?: string;
    goodReadsId?: string;
    isbn?: string;
    readingState: ReadingState;
    startedReading?: Date;
    finishedReading?: Date;
    title: string;
    author?: string;
    publishedDate?: string;
    coverImageURL?: string;
    genres: string[];
  }

  export interface UserShelfEntry extends Omit<ShelfEntry, 'readingState'> {
    readingState: ReadingState;
    clubId?: string;
    club?: Club;
  }

  export interface UserSelectedGenre {
    key: string;
    name: string;
  }

  export interface User extends DocumentFields, MongoTimestamps {
    bio?: string;
    discordId: string;
    goodreadsUrl?: string;
    website?: string;
    name?: string;
    photoUrl?: string;
    smallPhotoUrl?: string;
    readingSpeed?: ReadingSpeed;
    age?: number;
    gender?: string;
    location?: string;
    isBot: boolean;
    urlSlug: string;
    selectedGenres: UserSelectedGenre[];
    questions: UserQA[];
    shelf: { [key in UserShelfReadingState]: UserShelfEntry[] };
    onboardingVersion: number;
  }

  export interface Genres {
    _id: string;
    mainGenres: string[];
    genres: {
      [key: string]: Genre;
    };
  }

  export interface Genre extends DocumentFields {
    key: string;
    name: string;
    subgenres: string[];
  }

  export interface UserQA {
    id: string;
    title: string;
    answer: string;
    userVisible: boolean;
    sort: number;
  }

  export interface ProfileQuestions {
    _id: string;
    questions: ProfileQuestion[];
  }

  export interface ProfileQuestion extends DocumentFields {
    id: string;
    title: string;
    subtitle: string;
    required: boolean;
    min: number;
    max: number;
  }

  export type EditableUserField =
    | 'bio'
    | 'goodreadsUrl'
    | 'website'
    | 'name'
    | 'photoUrl'
    | 'readingSpeed'
    | 'age'
    | 'gender'
    | 'location'
    | 'selectedGenres'
    | 'questions'
    | 'shelf';

  export type ChannelSource = 'discord';

  export type MembershipStatus = 'notMember' | 'member' | 'owner';

  export type UserShelfReadingState = 'notStarted' | 'read';

  export type ReadingState = 'notStarted' | 'current' | 'read';

  export type ReadingSpeed = 'slow' | 'moderate' | 'fast';

  export type GroupVibe =
    | 'chill'
    | 'power'
    | 'learning'
    | 'first-timers'
    | 'nerdy';

  export namespace Services {
    export interface GetClubs {
      clubs: {
        _id: string;
        name: string;
        ownerId: string;
        shelf: any[];
        bio?: string;
        maxMembers: number;
        memberCount: number;
        vibe?: GroupVibe;
        readingSpeed?: ReadingSpeed;
        channelSource?: ChannelSource;
        channelId: string;
        createdAt: string;
        updatedAt: string;
        private: boolean;
      }[];
    }
    export interface GetClubById {
      _id: string;
      name: string;
      ownerId: string;
      ownerDiscordId: string;
      shelf: any[];
      bio: string;
      members: any[];
      maxMembers: number;
      vibe: GroupVibe;
      readingSpeed: ReadingSpeed;
      guildId: string;
      channelSource: ChannelSource;
      channelId: string;
      createdAt: string;
      updatedAt: string;
      private: boolean;
    }
    export interface CreateClubResult {
      club: Club;
      discord: any;
    }
    export interface GetGenres extends Omit<Genres, '_id'> {}
    export interface ReadingPreferencesResult {
      genres: string[];
      readingSpeed: string;
    }
    export interface GetProfileQuestions
      extends Omit<ProfileQuestions, '_id'> {}
  }

  export namespace GoogleBooks {
    // Generated by https://quicktype.io
    //
    // To change quicktype's target language, run command:
    //
    //   "Set quicktype target language"

    export interface Books {
      kind: string;
      totalItems: number;
      items: Item[];
    }

    export interface Item {
      kind: Kind;
      id: string;
      etag: string;
      selfLink: string;
      volumeInfo: VolumeInfo;
      saleInfo: SaleInfo;
      accessInfo: AccessInfo;
      searchInfo?: SearchInfo;
    }

    export interface AccessInfo {
      country: Country;
      viewability: Viewability;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: TextToSpeechPermission;
      epub: Epub;
      pdf: Epub;
      webReaderLink: string;
      accessViewStatus: AccessViewStatus;
      quoteSharingAllowed: boolean;
    }

    export enum AccessViewStatus {
      FullPublicDomain = 'FULL_PUBLIC_DOMAIN',
      Sample = 'SAMPLE',
    }

    export enum Country {
      CA = 'CA',
    }

    export interface Epub {
      isAvailable: boolean;
      downloadLink?: string;
      acsTokenLink?: string;
    }

    export enum TextToSpeechPermission {
      Allowed = 'ALLOWED',
      AllowedForAccessibility = 'ALLOWED_FOR_ACCESSIBILITY',
    }

    export enum Viewability {
      AllPages = 'ALL_PAGES',
      Partial = 'PARTIAL',
    }

    export enum Kind {
      BooksVolume = 'books#volume',
    }

    export interface SaleInfo {
      country: Country;
      saleability: Saleability;
      isEbook: boolean;
      buyLink?: string;
      listPrice?: SaleInfoListPrice;
      retailPrice?: SaleInfoListPrice;
      offers?: Offer[];
    }

    export interface SaleInfoListPrice {
      amount: number;
      currencyCode: string;
    }

    export interface Offer {
      finskyOfferType: number;
      listPrice: OfferListPrice;
      retailPrice: OfferListPrice;
      giftable: boolean;
    }

    export interface OfferListPrice {
      amountInMicros: number;
      currencyCode: string;
    }

    export enum Saleability {
      ForSale = 'FOR_SALE',
      Free = 'FREE',
      NotForSale = 'NOT_FOR_SALE',
    }

    export interface SearchInfo {
      textSnippet: string;
    }

    export interface VolumeInfo {
      title: string;
      authors: string[];
      publishedDate: string;
      industryIdentifiers: IndustryIdentifier[];
      readingModes: ReadingModes;
      pageCount?: number;
      printType: PrintType;
      maturityRating: MaturityRating;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary?: PanelizationSummary;
      imageLinks: ImageLinks;
      language: Language;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string;
      publisher?: string;
      description?: string;
      categories?: string[];
      averageRating?: number;
      ratingsCount?: number;
      subtitle?: string;
    }

    export interface ImageLinks {
      smallThumbnail: string;
      thumbnail: string;
    }

    export interface IndustryIdentifier {
      type: Type;
      identifier: string;
    }

    export enum Type {
      Isbn10 = 'ISBN_10',
      Isbn13 = 'ISBN_13',
      Other = 'OTHER',
    }

    export enum Language {
      En = 'en',
    }

    export enum MaturityRating {
      NotMature = 'NOT_MATURE',
    }

    export interface PanelizationSummary {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    }

    export enum PrintType {
      Book = 'BOOK',
    }

    export interface ReadingModes {
      text: boolean;
      image: boolean;
    }
  }
}
