import React from "react";
import Project from "./Project";
import Translate from "@docusaurus/Translate";
import MusicChainResource from "../../static/files/music-chain.pdf";
import PicDBResource from "../../static/files/picdb.pdf";
import ZhuyinCrackerResource from "../../static/files/zhuyin-cracker.pdf";
const Projects = () => {
  const works = [
    {
      stack: ["MLOps", "Kubernetes", "Java", "Go", "Python"],
      description:
        "Apache Submarine is an End-to-End Machine Learning Platform to allow data scientists to create end-to-end machine learning workflows. I'm contributing to submarine server and operator.",
      title: "Apache Submarine",
      github: "https://github.com/apache/submarine",
      // resource: MusicChainResource,
      url: "https://submarine.apache.org/",
      // image: "img/projects/submarine.png",
      index: 0,
    },

    {
      stack: ["React", "Solidity", "Essentia", "Docker", "IPFS"],
      description:
        "A platform to make original and cover visible and valuable. It leverages many blockchain features to make this copyright-protection idea possible.",
      title: "Music Chain",
      github: "https://github.com/atosystem/MusicChain",
      url: MusicChainResource,
      // image: "img/Recipe-hub.png",
      index: 1,
    },
    {
      stack: ["STM32", "MbedOS", "PyGame", "C++"],
      description:
        "We have created an simple treasure hunting game played with motion control, integrated with several sensors in STM32 board with our own motion detection algorithm, object class wrapper and multi-threading techniques.",
      title: "Remote Game Controller",
      github: "https://github.com/yitingwu31/2021eslab_final",
      url: "https://github.com/yitingwu31/2021eslab_final/blob/main/Report.md",
      // image: "img/django-blog.png",
      index: 2,
    },
    {
      stack: ["MongoDB", "Python"],
      description:
        "We propose an image management system on top of MongoDB to free user from the burden of image management of machine learning.",
      title: "Picture DB",
      github: "https://github.com/yobekili/DB_Final",
      url: PicDBResource,
      // url: "../../static/files/picdb.pdf",
      // image: "img/APP.jpg",
      index: 3,
    },
    {
      stack: ["PCFG", "C++", "Python"],
      description:
        "We enhance Probabilistic Context-Free Grammar (PCFG) by the Zhuyin feature. Eventually, in evaluation, we can mutate Zhuyin patterns successfully and hit much more real passwords than the other tools.",
      title: "Zhuyin Password Cracker",
      github: "https://github.com/b04902036/zhuyin_searcher",
      url: ZhuyinCrackerResource, 
      // url: "../../static/files/zhuyin-cracker.pdf",
      // image: "img/APP.jpg",
      index: 4,
    },
  ];

  return (
    <div className="projects">
      <h1 className="recent-projects">
        <Translate>Recent Projects</Translate>
      </h1>
      <div className="underline"></div>
      <div className="section-center projects-center">
        {works.map(
          ({ description, stack, title, github, url, image, index }) => (
            <Project
              stack={stack}
              key={index}
              description={description}
              title={title}
              url={url}
              github={github}
              image={image}
              index={index}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Projects;
