const STORY_TITLE = "Where Clay Meets Soul";

const STORY_CONTENT = [
  "It initially began as a weekend hobby to get away from college stress and stop missing home in a new city, which soon turned into curiosity for knowing all the details about handmade pottery. I didn't choose pottery, pottery chose me.",
  "With a commerce and mass communication background and never having touched clay, it was difficult to find a center when I started my pottery journey. It began with a curious mind to explore just another art form, which turned into a passion for making handmade pieces, just like handwritten notes and poems.",
  "Pottery for me is not just an art form or a way of expressing myself. This art form is my teacher - it has taught me the importance of trusting the process, patience, uncertainty of life and also the beauty of letting go. The learnings are endless.",
  "I am not a potter, I am a student of pottery and will be forever.",
];

export function AboutStorySection() {
  return (
    <section className="container mx-auto px-4 py-12 lg:px-8 lg:pt-0 lg:pb-20">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Video */}
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
          <video
            src="https://cdn.poetryandpottery.prodapp.club/videos/poetry-pottery-about.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary/90 rounded-full px-3 py-1 text-xs font-medium text-white">
              The Beginning
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="font-display mb-4 text-2xl font-bold text-neutral-900 lg:text-3xl">
            {STORY_TITLE}
          </h2>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            {STORY_CONTENT.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
