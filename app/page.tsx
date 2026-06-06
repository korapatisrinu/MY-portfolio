import VideoIntro from "./components/VideoIntro/VideoIntro";
import styles from "./page.module.css";

const capabilities = [
  "Python",
  "Flask",
  "MySQL",
  "MongoDB",
  "HTML",
  "CSS",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "Seaborn",
  "Scikit-learn",
  "GitHub",
  "VS Code"
];

const projects = [
  {
    title: "NLP Text Classification",
    description:
      "Built a machine learning system that classifies messages as spam or not spam using preprocessing, TF-IDF vectorization, and supervised learning models.",
    meta: "Python / Scikit-learn / Pandas / NumPy",
    role: "Machine Learning Developer"
  },
  {
    title: "AI Coding Practice Platform",
    description:
      "Developed a web platform where users can solve programming problems, store results, and track progress through a Flask backend and MySQL database.",
    meta: "Python / Flask / MySQL / HTML / CSS",
    role: "Full Stack Developer"
  },
  {
    title: "Cinematic Developer Portfolio",
    description:
      "Created this immersive personal portfolio with video storytelling, animated particles, glass controls, and responsive sections for profile presentation.",
    meta: "Next.js / Three.js / GSAP / CSS Modules",
    role: "Frontend Developer"
  }
];

const education = [
  {
    title: "B.Tech in Artificial Intelligence & Data Science",
    place: "Muthayammal Engineering College (Autonomous), Rasipuram",
    detail: "Anna University | CGPA 7.69 | 2026"
  },
  {
    title: "Intermediate",
    place: "Narayana Junior College, Gudur",
    detail: "BIEAP State Board | 71.5% | 2022"
  },
  {
    title: "SSC",
    place: "Narayana E-Techno School, Gudur",
    detail: "BSEAP State Board | 96% | 2020"
  }
];

const certifications = [
  "NPTEL Foundation of Cloud IoT Edge ML",
  "NPTEL Distributed Systems",
  "500+ Python practice problems completed on CodeChef"
];

const strengths = [
  "Hardworking and quick learner",
  "Strong communication ability",
  "Active listening",
  "Time management",
  "Telugu and English"
];

export default function Home() {
  return (
    <main>
      <VideoIntro />

      <section id="profile" className={styles.storySection}>
        <div className={styles.sectionGrid}>
          <div>
            <p className={styles.eyebrow}>Profile</p>
            <h2>AI & DS student building practical software with clear problem-solving.</h2>
          </div>

          <p className={styles.lede}>
            I am Korapati Srinivasulu, a B.Tech Artificial Intelligence and Data
            Science student focused on Python, machine learning, Flask web
            development, and database-backed applications. I want to contribute
            to innovative software solutions while growing as a technology
            professional.
          </p>
        </div>

        <div className={styles.profilePanel}>
          <div>
            <span>Email</span>
            <a href="mailto:korapatisrinivasulu14@gmail.com">
              korapatisrinivasulu14@gmail.com
            </a>
          </div>
          <div>
            <span>Phone</span>
            <a href="tel:+919390614094">+91 9390614094</a>
          </div>
          <div>
            <span>LinkedIn</span>
            <a href="https://www.linkedin.com/in/korapati-srinivasulu">
              korapati-srinivasulu
            </a>
          </div>
          <div>
            <span>Resume</span>
            <a href="/resume/korapati-srinivasulu-resume.pdf">Download PDF</a>
          </div>
        </div>
      </section>

      <section id="projects" className={styles.projectSection}>
        <div className={styles.sectionGrid}>
          <div>
            <p className={styles.eyebrow}>Projects</p>
            <h2>Hands-on work across machine learning and full stack development.</h2>
          </div>

          <p className={styles.lede}>
            These projects show my current direction: using AI concepts, data
            preprocessing, backend development, and simple interfaces to solve
            real problems with practical engineering.
          </p>
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article className={styles.projectCard} key={project.title}>
              <span>{project.meta}</span>
              <h3>{project.title}</h3>
              <strong>{project.role}</strong>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="craft" className={styles.craftSection}>
        <div className={styles.craftHeader}>
          <p className={styles.eyebrow}>Technical skills</p>
          <h2>Tools I use to build, analyze, and ship software.</h2>
        </div>

        <div className={styles.capabilityList}>
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>

      <section id="education" className={styles.credentialsSection}>
        <div className={styles.credentialsGrid}>
          <div>
            <p className={styles.eyebrow}>Education</p>
            <div className={styles.timeline}>
              {education.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.place}</p>
                  <span>{item.detail}</span>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className={styles.eyebrow}>Certifications & strengths</p>
            <div className={styles.listPanel}>
              {certifications.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <div className={styles.strengthList}>
              {strengths.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
