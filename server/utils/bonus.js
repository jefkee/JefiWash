import express from 'express';
import { PrismaClient } from '@prisma/client';
import xmljs from 'xml-js';
import db from './db.js';

const app = express();
const BaseUrl = '/api/dataXmlPdf/';

app.get('/dataJson', async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const orders = await prisma.orders.findMany({
      include: { songs: true, Artist: true },
    });
    const songs = await prisma.song.findMany({
      include: { Album: true, Artist: true},
    });
    const artists = await prisma.artist.findMany({
      include: { songs: true, albums: true },
    });

    const data = {
      albums,
      songs,
      artists,
    };
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});

export default app;