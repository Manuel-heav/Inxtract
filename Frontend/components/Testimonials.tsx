import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const testimonials = [
{
    username: 'John Doe',
    description: 'Inxtract is a game-changer. Simplifies content, saves time, and enhances productivity.',
    date: '24 June, 2024',
},
{
    username: 'Jane Smith',
    description: 'I love Inxtract. It has made my life so much easier. I can now focus on other important tasks.',
    date: '28 April, 2024',
},
{
    username: 'Alice Johnson',
    description: 'Inxtract is a must-have tool for students and professionals. It is easy to use and saves time.',
    date: '01 May, 2024',
}]

export default function Testimonials() {
  return (
    <Carousel className="ml-12 w-full max-w-sm mt-8">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="bg-[#E4E3E8]">
                <CardContent className="flex flex-col items-start justify-between p-6 h-60">
                  <div className="flex gap-2 items-center mb-4">
                  <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-xl font-semibold">{testimonial.username}</span>
                  </div>
                  <div className="flex-grow"></div>
                  <div>
                    <p className="text-gray-700 mb-2">{testimonial.description}</p>
                    <p className="text-gray-500 text-sm">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
