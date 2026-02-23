import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.course.deleteMany();
  await prisma.examQuestion.deleteMany();
  await prisma.exam.deleteMany();

  await prisma.course.createMany({
    data: [
      { title: "Mathematics Mastery", description: "Algebra, geometry, and practice sets", price: 49, level: "Grade 9-12" },
      { title: "English Communication", description: "Speaking and writing confidence", price: 39, level: "All Levels" },
      { title: "Science Explorer", description: "Hands-on physics, chemistry and biology", price: 45, level: "Grade 6-10" },
      { title: "Coding Fundamentals", description: "Programming basics with projects", price: 59, level: "Beginner" }
    ]
  });

  const exam = await prisma.exam.create({
    data: {
      title: "General Aptitude Demo",
      description: "A short 5-question practice exam"
    }
  });

  await prisma.examQuestion.createMany({
    data: [
      { examId: exam.id, prompt: "Which planet is known as the Red Planet?", optionsJson: JSON.stringify(["Venus", "Mars", "Jupiter"]), answerIndex: 1 },
      { examId: exam.id, prompt: "What is 15 × 3?", optionsJson: JSON.stringify(["35", "45", "30"]), answerIndex: 1 },
      { examId: exam.id, prompt: "HTML stands for?", optionsJson: JSON.stringify(["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language"]), answerIndex: 0 },
      { examId: exam.id, prompt: "Water freezes at?", optionsJson: JSON.stringify(["0°C", "100°C", "-10°C"]), answerIndex: 0 },
      { examId: exam.id, prompt: "Synonym of 'Rapid' is?", optionsJson: JSON.stringify(["Slow", "Fast", "Soft"]), answerIndex: 1 }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
