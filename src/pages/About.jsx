// src/pages/About.jsx
import React from "react";
import { Search, Shield, Clock3 } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] py-20 px-6">
      {/* Top intro section */}
      <section className="mb-20">
        <h1 className="text-center text-5xl font-extrabold text-[#123524] mb-10">
          About HavenStay
        </h1>

        <p className="max-w-4xl mx-auto text-center text-xl text-[#315b4c] leading-relaxed">
          At HavenStay, we're passionate about connecting travelers with
          exceptional accommodations around the world. Whether you're planning
          a weekend getaway, a business trip, or an extended vacation, we make
          it easy to find the perfect place to stay.
        </p>
      </section>

      {/* Why Choose HavenStay section */}
      <section className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold text-[#123524] mb-12">
          Why Choose HavenStay
        </h2>

        {/* Cards grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#e4e0d6] px-10 py-12 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#e6efea]">
              <Search className="h-10 w-10 text-[#123524]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#123524] mb-4">
              Easy Search
            </h3>
            <p className="text-base leading-relaxed text-[#315b4c]">
              Find your perfect accommodation with our intuitive search and
              filter system. Browse by country, property type, price range,
              and more.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#e4e0d6] px-10 py-12 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#e6efea]">
              <Shield className="h-10 w-10 text-[#123524]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#123524] mb-4">
              Verified Rentals
            </h3>
            <p className="text-base leading-relaxed text-[#315b4c]">
              All properties are carefully verified to ensure quality and
              safety. Book with confidence knowing you&apos;re getting exactly
              what you see.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#e4e0d6] px-10 py-12 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#e6efea]">
              <Clock3 className="h-10 w-10 text-[#123524]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#123524] mb-4">
              Flexible Options
            </h3>
            <p className="text-base leading-relaxed text-[#315b4c]">
              Whether you need a place for a night or a month, we offer flexible
              booking options to suit your travel plans.
            </p>
          </div>
        </div>
      </section>
      {/* Our Mission Section */}
<section className="max-w-6xl mx-auto mt-20">
  <div className="bg-white rounded-3xl shadow-sm border border-[#e4e0d6] px-10 py-16 text-center mx-12">
    <h2 className="text-4xl font-extrabold text-[#123524] mb-10">
      Our Mission
    </h2>

    <p className="text-xl leading-relaxed text-[#315b4c] max-w-4xl mx-auto mb-10">
      Our mission is simple: to help travelers find comfort wherever they go. 
      We believe that great accommodations are the foundation of memorable 
      travel experiences. That's why we've curated a diverse collection of 
      properties, from cozy studios in bustling cities to luxurious villas 
      in tropical paradises.
    </p>

    <p className="text-xl leading-relaxed text-[#315b4c] max-w-4xl mx-auto">
      Whether you're a solo adventurer, a couple seeking romance, or a family 
      on vacation, HavenStay is here to make your travel dreams a reality.
    </p>
  </div>
</section>

    </div>
  );
}

export default About;
