import axios from 'axios';
import {
  Services,
  ChannelSource,
  ShelfEntry,
  ReadingSpeed,
  User,
  FilterAutoMongoKeys,
} from '@caravan/buddy-reading-types';

const clubRoute = '/api/club';

interface CreateClubProps {
  name: string;
  shelf?: any;
  bio: string;
  maxMembers: string;
  vibe: string;
  readingSpeed: string;
  channelSource: ChannelSource;
  private: boolean;
}

export async function getAllClubs(
  after?: string,
  pageSize?: number,
  readingSpeed?: ReadingSpeed
) {
  const res = await axios.get<Services.GetClubs>(clubRoute, {
    params: {
      after,
      pageSize,
      readingSpeed,
    },
  });
  return res;
}

export async function getClub(clubId: string) {
  const res = await axios.get<Services.GetClubById | null>(
    `${clubRoute}/${clubId}`
  );
  const club = res.data;
  return club;
}

export async function getClubsById(clubIds: string[]) {
  const res = await axios.post<Services.GetClubById[]>(
    `${clubRoute}/clubsById`,
    {
      clubIds,
    }
  );
  const clubs = res.data;
  return clubs;
}

export async function getUserClubs(user: User) {
  const res = await axios.post<Services.GetClubs['clubs']>(
    `${clubRoute}/getUserClubs`,
    { user }
  );
  return res;
}

export async function modifyMyClubMembership(
  clubId: string,
  isMember: boolean
) {
  const res = await axios.put(`${clubRoute}/${clubId}/membership`, {
    isMember,
  });
  return res;
}

export async function deleteClub(clubId: string) {
  const res = await axios.delete(`${clubRoute}/${clubId}`);
  return res;
}

export async function updateCurrentlyReadBook(
  clubId: string,
  newBook: FilterAutoMongoKeys<ShelfEntry> | ShelfEntry,
  newEntry: boolean,
  prevBookId: string,
  finishedPrev: boolean,
  addToWantToRead: FilterAutoMongoKeys<ShelfEntry>[]
) {
  const res = await axios.put(`${clubRoute}/${clubId}/updateBook`, {
    newBook,
    newEntry,
    prevBookId,
    finishedPrev,
    addToWantToRead,
  });
  if (res.status === 200) {
    return res.data;
  } else {
    return res.status;
  }
}

export async function createClub(props: CreateClubProps) {
  const body = {
    name: props.name,
    shelf: props.shelf,
    bio: props.bio,
    maxMembers: props.maxMembers,
    vibe: props.vibe,
    readingSpeed: props.readingSpeed,
    private: props.private,
    channelSource: props.channelSource,
  };

  const res = await axios.post<Services.CreateClubResult | null>(
    clubRoute,
    body
  );
  return res;
}