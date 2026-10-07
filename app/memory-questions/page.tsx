"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, CirclePlus, Clock3, FileQuestion, Minus, Send } from "lucide-react";

const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || "https://contact.kirandhakal.me";
const CONTACT_FORM_KEY = process.env.NEXT_PUBLIC_CONTACT_FORM_KEY
  || "frm__09awUKy6LNQDgXB1DmLVBpE";

type Question = { question: string; options: string[] };

const initialQuestions: Question[] = [
  { question: "What possesses the thread of a program?", options: ["Process", "Compiler", "CPU", "Memory"] },
  { question: "F(A,B,C,D), if all possible minterms from 0 to 15 are included, what is the simplified value of the function?", options: ["0", "1", "A + B + C + D", "A′B′C′D′"] },
  { question: "Find the output of this C++ program:\n\n#include <iostream>\nusing namespace std;\nvoid fun() { int count = 0; count++; cout << count << \" \"; }\nint main() { fun(); fun(); fun(); return 0; }", options: ["1 2 3", "1 1 1", "0 1 2", "3 3 3"] },
  { question: "What will be the output of this C program?\n\nchar str[] = \"abcde\";\nchar *p = str;\nprintf(\"%c %c\", *p, *(p + 2));", options: ["a a", "a c", "b d", "Error"] },
  { question: "What is the relationship between common-base current gain α and common-emitter current gain β?", options: ["α = (β + 1) / β", "α = (β − 1) / β", "α = β / (β + 1)", "α = β − 1"] },
  { question: "What does fopen(\"file.txt\", \"w\") return when the file is opened successfully?", options: ["1", "0", "-1", "A non-null FILE pointer"] },
  { question: "In which year was the Nepal Engineering Council (NEC) First Amendment Act enacted?", options: ["2076", "2079", "2080", "2081"] },
  { question: "What is an inline function in C++?", options: ["A function whose code may be expanded at the point of call", "A function that can be called only once", "A function that cannot return a value", "A function that is always executed first"] },
];

function emptyQuestion(): Question {
  return { question: "", options: ["", "", "", ""] };
}

export default function MemoryQuestionsPage() {
  const [contributor, setContributor] = useState("");
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("2026-10-07");
  const [examTime, setExamTime] = useState("12:00-14:00");
  const [questions, setQuestions] = useState(initialQuestions);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateQuestion = (index: number, value: string) => setQuestions((current) => current.map((item, i) => i === index ? { ...item, question: value } : item));
  const updateOption = (questionIndex: number, optionIndex: number, value: string) => setQuestions((current) => current.map((item, i) => i === questionIndex ? { ...item, options: item.options.map((option, j) => j === optionIndex ? value : option) } : item));
  const addQuestion = () => setQuestions((current) => [...current, emptyQuestion()]);
  const removeQuestion = (index: number) => setQuestions((current) => current.filter((_, i) => i !== index));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const cleanedQuestions = questions
      .map(({ question, options }) => ({ question: question.trim(), options: options.map((option) => option.trim()).filter(Boolean) }))
      .filter(({ question }) => question);
    if (!cleanedQuestions.length) {
      setMessage("Add at least one question before submitting.");
      setSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`${CONTACT_API_URL.replace(/\/$/, "")}/v1/forms/${encodeURIComponent(CONTACT_FORM_KEY)}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({ contributor: contributor.trim(), subject: subject.trim(), examDate, examTime, questions: cleanedQuestions }),
      });
      if (!response.ok) throw new Error("The questions could not be submitted. Please try again.");
      setSubmitted(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7f4] px-4 py-10 text-slate-900 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-9 rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300"><FileQuestion size={17} /> Community exam notes</div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Memory based questions</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Share what you remember from the exam so others can prepare. Add the subject, exam date and time, then review or edit the starter questions.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200"><span className="rounded-full bg-white/10 px-4 py-2">October 7 exam</span><span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Clock3 size={15} /> 12:00–14:00</span></div>
        </header>

        {submitted ? (
          <section className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <CheckCircle2 className="mx-auto text-emerald-600" size={48} />
            <h2 className="mt-5 text-2xl font-bold">Thanks for sharing!</h2>
            <p className="mt-2 text-slate-600">Your memory based questions have been added for others to learn from.</p>
            <button className="mt-7 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700" onClick={() => { setSubmitted(false); setContributor(""); setSubject(""); setQuestions([emptyQuestion()]); }}>Submit another response</button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-7">
              <label className="block text-sm font-semibold text-slate-700">Your name <span className="font-normal text-slate-400">(optional)</span><input value={contributor} onChange={(event) => setContributor(event.target.value)} maxLength={100} placeholder="Name or nickname" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
              <label className="block text-sm font-semibold text-slate-700">Subject<input required value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={120} placeholder="e.g. Computer Engineering" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
              <label className="block text-sm font-semibold text-slate-700">Exam date<input required type="date" value={examDate} onChange={(event) => setExamDate(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
              <label className="block text-sm font-semibold text-slate-700">Exam time<input required value={examTime} onChange={(event) => setExamTime(event.target.value)} maxLength={40} placeholder="e.g. 12:00–14:00" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
            </section>

            <div className="flex flex-wrap items-end justify-between gap-3 px-1"><div><h2 className="text-xl font-bold">Questions</h2><p className="mt-1 text-sm text-slate-500">Enter up to four choices; leave unused choice fields empty.</p></div><button type="button" onClick={addQuestion} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold hover:border-slate-500"><CirclePlus size={17} /> Add question</button></div>

            {questions.map((item, index) => (
              <section key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-4 flex items-center justify-between"><h3 className="font-bold text-slate-800">Question {index + 1}</h3>{questions.length > 1 && <button type="button" onClick={() => removeQuestion(index)} aria-label={`Remove question ${index + 1}`} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Minus size={18} /></button>}</div>
                <label className="block text-sm font-semibold text-slate-700">Question text<textarea required value={item.question} onChange={(event) => updateQuestion(index, event.target.value)} maxLength={4000} rows={item.question.includes("\n") ? 7 : 3} placeholder="Write the question as you remember it" className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-normal leading-6 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">{item.options.map((option, optionIndex) => <label key={optionIndex} className="block text-sm font-medium text-slate-600">Option {String.fromCharCode(65 + optionIndex)} <span className="text-slate-400">(optional)</span><input value={option} onChange={(event) => updateOption(index, optionIndex, event.target.value)} maxLength={500} placeholder={`Choice ${String.fromCharCode(65 + optionIndex)}`} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>)}</div>
              </section>
            ))}

            {message && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{message}</p>}
            <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60 sm:w-auto"><Send size={18} />{submitting ? "Submitting…" : "Share questions"}</button>
          </form>
        )}
        <p className="mt-8 text-center text-xs text-slate-400">Please share questions only. Answers can be discussed separately.</p>
      </div>
    </main>
  );
}
