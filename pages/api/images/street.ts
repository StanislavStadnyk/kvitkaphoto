// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  thumb: string;
  src: string;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([
    {
      id: 1,
      thumb: "/images/street/img1.jpg",
      src: "/images/street/img1-b.jpg",
    },
    {
      id: 2,
      thumb: "/images/street/img2.jpg",
      src: "/images/street/img2-b.jpg",
    },
  ]);
}
