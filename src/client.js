import { Client } from '@petfinder/petfinder-js';

const PUBLIC_KEY = '9h6Mk2QZtyNPWg6ejM4ublAx3atU30u5JSnyEKdH4iYQvVwVyo';

const client = new Client({ apiKey: PUBLIC_KEY, secret: process.env.PET_FINDER_SECRET_KEY })


export default client;