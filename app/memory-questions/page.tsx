"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  CirclePlus,
  Clock3,
  FileQuestion,
  Loader2,
  Minus,
  Send,
  UserRound,
  X,
} from "lucide-react";
import {
  defaultExamDate,
  defaultExamTime,
  emptyQuestion,
  formatExamDate,
  subjectsFromSubmissions,
  type MemoryQuestion,
  type MemorySubmission,
} from "@/lib/memory-questions";

const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || "https://contact.kirandhakal.me";
const CONTACT_FORM_KEY = process.env.NEXT_PUBLIC_CONTACT_FORM_KEY
  || "frm__09awUKy6LNQDgXB1DmLVBpE";

type AddStep = "meta" | "questions";

type ListedQuestion = MemoryQuestion & {
  key: string;
  contributor?: string;
  examDate: string;
  examTime: string;
};

export default function MemoryQuestionsPage() {
  const [submissions, setSubmissions] = useState<MemorySubmission[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeSubject, setActiveSubject] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [addStep, setAddStep] = useState<AddStep>("meta");
  const [contributor, setContributor] = useState("");
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState(defaultExamDate);
  const [examTime, setExamTime] = useState(defaultExamTime);
  const [questions, setQuestions] = useState<MemoryQuestion[]>([emptyQuestion()]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const loadSubmissions = useCallback(async () => {
    setLoadingList(true);
    try {
      const response = await fetch("/api/memory-questions");
      if (!response.ok) throw new Error("Could not load questions.");
      const data = (await response.json()) as { submissions?: MemorySubmission[] };
      setSubmissions(Array.isArray(data.submissions) ? data.submissions : []);
    } catch {
      setSubmissions([]);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    void loadSubmissions();
  }, [loadSubmissions]);

  const subjects = useMemo(() => subjectsFromSubmissions(submissions), [submissions]);

  useEffect(() => {
    if (!subjects.length) {
      setActiveSubject("");
      return;
    }
    if (!activeSubject || !subjects.includes(activeSubject)) {
      setActiveSubject(subjects[0]);
    }
  }, [subjects, activeSubject]);

  const listedQuestions = useMemo((): ListedQuestion[] => {
    const items: ListedQuestion[] = [];
    for (const submission of submissions) {
      if (submission.subject.trim() !== activeSubject) continue;
      submission.questions.forEach((question, index) => {
        items.push({
          ...question,
          key: `${submission.id}-${index}`,
          contributor: submission.contributor,
          examDate: submission.examDate,
          examTime: submission.examTime,
        });
      });
    }
    return items;
  }, [submissions, activeSubject]);

  const resetAddFlow = () => {
    setAddStep("meta");
    setContributor("");
    setSubject(activeSubject || "");
    setExamDate(defaultExamDate);
    setExamTime(defaultExamTime);
    setQuestions([emptyQuestion()]);
    setMessage("");
    setSubmitted(false);
  };

  const openAddModal = () => {
    resetAddFlow();
    setSubject((current) => current || activeSubject);
    setAddOpen(true);
  };

  const closeAddModal = () => {
    setAddOpen(false);
    resetAddFlow();
  };

  const continueFromMeta = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!subject.trim()) {
      setMessage("Subject is required.");
      return;
    }
    setMessage("");
    setAddStep("questions");
  };

  const updateQuestion = (index: number, value: string) => {
    setQuestions((current) => current.map((item, i) => (i === index ? { ...item, question: value } : item)));
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions((current) => current.map((item, i) => (
      i === questionIndex
        ? { ...item, options: item.options.map((option, j) => (j === optionIndex ? value : option)) }
        : item
    )));
  };

  const addQuestionRow = () => setQuestions((current) => [...current, emptyQuestion()]);
  const removeQuestionRow = (index: number) => setQuestions((current) => current.filter((_, i) => i !== index));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const cleanedQuestions = questions
      .map(({ question, options }) => ({
        question: question.trim(),
        options: options.map((option) => option.trim()).filter(Boolean),
      }))
      .filter(({ question }) => question);

    if (!cleanedQuestions.length) {
      setMessage("Add at least one question before submitting.");
      setSubmitting(false);
      return;
    }

    const trimmedSubject = subject.trim();

    try {
      const response = await fetch(
        `${CONTACT_API_URL.replace(/\/$/, "")}/v1/forms/${encodeURIComponent(CONTACT_FORM_KEY)}/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() },
          body: JSON.stringify({
            contributor: contributor.trim(),
            subject: trimmedSubject,
            examDate,
            examTime,
            questions: cleanedQuestions,
          }),
        },
      );
      if (!response.ok) throw new Error("The questions could not be submitted. Please try again.");

      setSubmitted(true);
      setSubmissions((current) => [
        {
          id: crypto.randomUUID(),
          contributor: contributor.trim() || undefined,
          subject: trimmedSubject,
          examDate,
          examTime,
          questions: cleanedQuestions,
        },
        ...current,
      ]);
      setActiveSubject(trimmedSubject);
      void loadSubmissions();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7f4] px-4 py-10 text-slate-900 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <FileQuestion size={17} />
            Community exam notes
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Memory based questions</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Browse what others remember from recent exams, grouped by subject. Share your own questions when you are ready.
              </p>
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              <CirclePlus size={18} />
              Add question
            </button>
          </div>
        </header>

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          {loadingList ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500">
              <Loader2 className="animate-spin" size={16} />
              Loading community questions…
            </div>
          ) : subjects.length ? (
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Subjects">
              {subjects.map((name) => {
                const selected = name === activeSubject;
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveSubject(name)}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      selected
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="px-3 py-2 text-sm text-slate-500">No subjects yet. Be the first to add a question.</p>
          )}
        </section>

        {activeSubject && (
          <div className="mb-4 flex flex-wrap items-center gap-3 px-1 text-sm text-slate-500">
            <span className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              {activeSubject}
            </span>
            {listedQuestions[0] && (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {formatExamDate(listedQuestions[0].examDate)}
                  {" · "}
                  {listedQuestions[0].examTime}
                </span>
              </>
            )}
          </div>
        )}

        <div className="space-y-4">
          {!loadingList && listedQuestions.length === 0 && (
            <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
              <p className="text-slate-600">No questions for this subject yet.</p>
              <button
                type="button"
                onClick={openAddModal}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                <CirclePlus size={16} />
                Add the first question
              </button>
            </section>
          )}

          {listedQuestions.map((item, index) => (
            <article key={item.key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                  Question
                  {" "}
                  {index + 1}
                </h2>
                {(item.contributor || item.examDate) && (
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    {item.contributor && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                        <UserRound size={12} />
                        {item.contributor}
                      </span>
                    )}
                    <span>{formatExamDate(item.examDate)}</span>
                    <span>{item.examTime}</span>
                  </div>
                )}
              </div>
              <p className="whitespace-pre-wrap text-base leading-7 text-slate-800">{item.question}</p>
              {item.options.length > 0 && (
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {item.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className="rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700"
                    >
                      <span className="mr-2 font-semibold text-slate-500">
                        {String.fromCharCode(65 + optionIndex)}
                        .
                      </span>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Please share questions only. Answers can be discussed separately.
        </p>
      </div>

      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 p-4 sm:items-center">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 cursor-default"
            onClick={closeAddModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-question-title"
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {addStep === "meta" ? "Step 1 of 2" : "Step 2 of 2"}
                </p>
                <h2 id="add-question-title" className="text-lg font-bold text-slate-900">
                  {submitted ? "Submitted" : addStep === "meta" ? "Exam details" : "Your questions"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeAddModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-10 text-center">
                <CheckCircle2 className="mx-auto text-emerald-600" size={44} />
                <p className="mt-4 font-semibold text-slate-800">Thanks for sharing!</p>
                <p className="mt-1 text-sm text-slate-600">Your questions are now listed under {subject.trim()}.</p>
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Done
                </button>
              </div>
            ) : addStep === "meta" ? (
              <form onSubmit={continueFromMeta} className="space-y-4 px-6 py-6">
                <label className="block text-sm font-semibold text-slate-700">
                  Your name
                  {" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                  <input
                    value={contributor}
                    onChange={(event) => setContributor(event.target.value)}
                    maxLength={100}
                    placeholder="Name or nickname"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Subject
                  <input
                    required
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    maxLength={120}
                    placeholder="e.g. Computer Engineering"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Exam date
                  <input
                    required
                    type="date"
                    value={examDate}
                    onChange={(event) => setExamDate(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Exam time
                  <input
                    required
                    value={examTime}
                    onChange={(event) => setExamTime(event.target.value)}
                    maxLength={40}
                    placeholder="e.g. 12:00-14:00"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </label>
                {message && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {message}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-emerald-700 px-6 py-3.5 font-bold text-white hover:bg-emerald-800"
                >
                  Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">{subject.trim()}</p>
                  <p className="mt-1">
                    {formatExamDate(examDate)}
                    {" · "}
                    {examTime}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAddStep("meta")}
                    className="mt-2 text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Edit details
                  </button>
                </div>

                {questions.map((item, index) => (
                  <section key={index} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-bold text-slate-800">
                        Question
                        {" "}
                        {index + 1}
                      </h3>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestionRow(index)}
                          aria-label={`Remove question ${index + 1}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Minus size={18} />
                        </button>
                      )}
                    </div>
                    <label className="block text-sm font-semibold text-slate-700">
                      Question text
                      <textarea
                        required
                        value={item.question}
                        onChange={(event) => updateQuestion(index, event.target.value)}
                        maxLength={4000}
                        rows={item.question.includes("\n") ? 7 : 3}
                        placeholder="Write the question as you remember it"
                        className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-normal leading-6 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </label>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {item.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="block text-sm font-medium text-slate-600">
                          Option
                          {" "}
                          {String.fromCharCode(65 + optionIndex)}
                          {" "}
                          <span className="text-slate-400">(optional)</span>
                          <input
                            value={option}
                            onChange={(event) => updateOption(index, optionIndex, event.target.value)}
                            maxLength={500}
                            placeholder={`Choice ${String.fromCharCode(65 + optionIndex)}`}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                          />
                        </label>
                      ))}
                    </div>
                  </section>
                ))}

                <button
                  type="button"
                  onClick={addQuestionRow}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold hover:border-slate-500"
                >
                  <CirclePlus size={17} />
                  Add another question
                </button>

                {message && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
                >
                  <Send size={18} />
                  {submitting ? "Submitting…" : "Share questions"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
