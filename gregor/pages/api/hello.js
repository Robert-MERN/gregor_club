/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

import { Server } from 'socket.io';

export default function handler(req, res) {
  // if (!res.socket.server.io) {
  //   const io = new Server(res.socket.server);
    
  //   io.on('connection', (socket) => {
  //     console.log('Client connected:', socket.id);

  //     socket.on('disconnect', () => {
  //       console.log('Client disconnected:', socket.id);
  //     });
  //   });

  //   res.socket.server.io = io;
  // }

  // res.end();

  console.log("I'm called as a Stripe webook")
  res.status(200).json({name: "Stripe webhook"})
}

