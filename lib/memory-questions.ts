export type MemoryQuestion = { question: string; options: string[] };

export type MemorySubmission = {
  id: string;
  contributor?: string;
  subject: string;
  examDate: string;
  examTime: string;
  questions: MemoryQuestion[];
};

export const defaultExamDate = "2026-10-07";
export const defaultExamTime = "12:00-14:00";

export const seedQuestions: MemoryQuestion[] = [
  { question: "What possesses the thread of a program?", options: ["Process", "Compiler", "CPU", "Memory"] },
  { question: "F(A,B,C,D), if all possible minterms from 0 to 15 are included, what is the simplified value of the function?", options: ["0", "1", "A + B + C + D", "A′B′C′D′"] },
  { question: "Find the output of this C++ program:\n\n#include <iostream>\nusing namespace std;\nvoid fun() { int count = 0; count++; cout << count << \" \"; }\nint main() { fun(); fun(); fun(); return 0; }", options: ["1 2 3", "1 1 1", "0 1 2", "3 3 3"] },
  { question: "What will be the output of this C program?\n\nchar str[] = \"abcde\";\nchar *p = str;\nprintf(\"%c %c\", *p, *(p + 2));", options: ["a a", "a c", "b d", "Error"] },
  { question: "What is the relationship between common-base current gain α and common-emitter current gain β?", options: ["α = (β + 1) / β", "α = (β − 1) / β", "α = β / (β + 1)", "α = β − 1"] },
  { question: "What does fopen(\"file.txt\", \"w\") return when the file is opened successfully?", options: ["1", "0", "-1", "A non-null FILE pointer"] },
  { question: "In which year was the Nepal Engineering Council (NEC) First Amendment Act enacted?", options: ["2076", "2079", "2080", "2081"] },
  { question: "What is an inline function in C++?", options: ["A function whose code may be expanded at the point of call", "A function that can be called only once", "A function that cannot return a value", "A function that is always executed first"] },
];

export function seedSubmissions(): MemorySubmission[] {
  return [
    {
      id: "seed-computer-engineering",
      subject: "Computer Engineering",
      examDate: defaultExamDate,
      examTime: defaultExamTime,
      contributor: "Starter set",
      questions: seedQuestions,
    },
  ];
}

export function emptyQuestion(): MemoryQuestion {
  return { question: "", options: ["", "", "", ""] };
}

export function formatExamDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const [, year, month, day] = match;
  return `${month}/${day}/${year}`;
}

export const NEC_SUBJECTS = [
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication Engineering",
  "Mechanical Engineering",
  "Architecture Engineering",
  "Information Technology Engineering",
  "Software Engineering",
  "Electrical and Electronics Engineering",
  "Geomatics Engineering",
  "Agricultural Engineering",
  "Civil and Rural Engineering",
  "Biomedical Engineering",
  "Automobile Engineering",
  "Industrial Engineering",
  "Environmental Engineering",
  "Aerospace Engineering",
  "Chemical Engineering",
] as const;

export type NecSubject = (typeof NEC_SUBJECTS)[number];

export function subjectsFromSubmissions(submissions: MemorySubmission[]): string[] {
  const seen = new Set<string>();
  const subjects: string[] = [];
  for (const item of submissions) {
    const subject = item.subject.trim();
    if (!subject || seen.has(subject)) continue;
    seen.add(subject);
    subjects.push(subject);
  }
  return subjects.sort((a, b) => a.localeCompare(b));
}

type RawSubmissionRecord = {
  id?: string;
  status?: string;
  payload?: Record<string, unknown>;
  data?: Record<string, unknown>;
};

export function parseSubmissionRecord(record: RawSubmissionRecord, index: number): MemorySubmission | null {
  if (record.status && record.status !== "accepted") {
    return null;
  }
  const payload = (record.payload ?? record.data ?? record) as Record<string, unknown>;
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const rawQuestions = payload.questions;
  if (!subject || !Array.isArray(rawQuestions)) return null;

  const questions: MemoryQuestion[] = rawQuestions
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as Record<string, unknown>;
      const question = typeof row.question === "string" ? row.question.trim() : "";
      const options = Array.isArray(row.options)
        ? row.options.filter((option): option is string => typeof option === "string").map((option) => option.trim()).filter(Boolean)
        : [];
      if (!question) return null;
      return { question, options };
    })
    .filter((item): item is MemoryQuestion => item !== null);

  if (!questions.length) return null;

  return {
    id: typeof record.id === "string" ? record.id : `submission-${index}`,
    contributor: typeof payload.contributor === "string" ? payload.contributor.trim() : undefined,
    subject,
    examDate: typeof payload.examDate === "string" ? payload.examDate : defaultExamDate,
    examTime: typeof payload.examTime === "string" ? payload.examTime : defaultExamTime,
    questions,
  };
}
