import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/themes/theme-toggle";
import NaturePortfolioScene from './NaturePortfolioScene';
import GlobeScene from './GlobeScene';
import SkillsVisualization from './SkillsVisualization';
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export default function Portfolio() {
  const projects: Project[] = [
    {
      title: "StarloPost",
      description:
        "A full-stack Thread clone made in NextJS, Clerk and MongoDB",
      image: "/starlopost.png",
      tags: ["React", "Node.js", "Clerk", "MongoDB"],
      link: "https://starlopost.vercel.app/",
    },
    {
      title: "StarloSearch",
      description: "A Search Engine fully made in HTML, JS and CSS",
      image: "/starlosearch.png",
      tags: ["Search", "Engine", "HTML", "JavaScript", "CSS"],
      link: "https://starlosearch.vercel.app/index.html",
    },
    {
      title: "LunarDB",
      description: "A NoSQL Cache, in memory database written in C++ and Ruby",
      image: "/lunardb.png",
      tags: ["Database", "C++", "NoSQL", "Multimodal"],
      link: "https://github.com/Kazooki123/lunardb",
    },
    {
      title: "Crabby",
      description: "A New and Modern Programming Language written in C",
      image: "/crabbylogo.jpg",
      tags: ["Language", "C", "Programming", "Modern"],
      link: "https://github.com/Kazooki123/crabby",
    },
    {
      title: "Typeify",
      description:
        "A JavaScript-to-Typescript syntax converter helpful for changing messy Javascript codes to Typescript!",
      image: "/typescript.png",
      tags: ["JavaScript", "Typescript", "Converter", "Type Safety"],
      link: "https://github.com/Kazooki123/typeify/",
    },
    {
      title: "Forest Camp",
      description:
        "A Unity Game that tells a emotional and wholesome story of a Father who lost everything and wants to forget everything by going to the far lands",
      image: "/forestcamp.png",
      tags: ["Unity", "Game", "3D", "Story"],
      link: "https://github.com/Kazooki123/Forest-Camp",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ThemeToggle />

      {/* Header with background image */}
      <header className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-[1]"></div>
        <div className="container mx-auto px-4 relative z-[2]">
          <h1 className="text-5xl font-bold text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient">
              StarloExoliz&apos;s
            </span>{" "}
            <span className="text-white">Portfolio</span>
          </h1>
        </div>
      </header>

      {/* About Me Section */}
      <section className="relative py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hypnodancer.gif"
            alt="Background Animation"
            fill
            className="object-cover opacity-20"
            unoptimized
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            About Me! :3
          </h2>
          <p className="text-xl text-center mb-8 max-w-2xl mx-auto backdrop-blur-sm bg-background/30 p-6 rounded-lg">
            Hi and my name is StarloExoliz, I am a Programmer, Student and love
            to play Games in my free time. I love to adventure into the world of
            A.I and Game Development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Web Developer",
                description:
                  "Passionate about creating responsive and user-friendly websites.",
                icon: "🌐",
              },
              {
                title: "Linux User",
                description:
                  "I use Arch btw. Just kidding but I do use both Arch and Ubuntu :)",
                icon: "🐧",
              },
              {
                title: "Uses Multiple Programming Languages",
                description:
                  "Not always but I tend to code in C++, C, Python, Rust, Ruby, Javascript, Typescript, Zig, Go and Kotlin. I sometimes use the Dart language.",
                icon: "👨‍💻",
              },
              {
                title: "Problem Solver",
                description:
                  "Enjoys tackling complex challenges and finding elegant solutions.",
                icon: "🧩",
              },
              {
                title: "Continuous Learner",
                description:
                  "Always eager to learn new technologies and improve my skills.",
                icon: "📚",
              },
              {
                title: "Experiences",
                description:
                  "I have Experiences in the field of Web development, Machine Learning, Game Development, App Development and even Database Development!",
                icon: "💼",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between backdrop-blur-md bg-black/70 border-none text-white hover:bg-black/80 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Chart Section */}
      <section className="py-12 bg-gradient-to-b from-background via-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8 text-center flex items-center justify-center gap-2">
            Skill Radar Chart
          </h2>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <SkillsVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 bg-gradient-to-b from-background via-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
            My Projects <span className="text-2xl">📖</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                href={project.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-300 hover:scale-[1.02]"
              >
                <Card className="overflow-hidden h-full transition-all duration-300 hover:bg-accent/80 hover:shadow-xl cursor-pointer backdrop-blur-sm bg-background/80">
                  <div className="relative w-full h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Scene Section */}
      <section className="relative py-16 bg-gradient-to-b from-black via-background to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
            My Tech Universe <span className="text-2xl">🌌</span>
          </h2>
          <NaturePortfolioScene projects={projects} />
          <GlobeScene />
        </div>
      </section>
    </div>
  );
}
