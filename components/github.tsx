"use client";

import { GitHubCalendar } from "react-github-calendar";

export default function GithubPage() {
  return (
    <div className="">
      <h1 className='text-xl font-bold text-slate-800 dark:text-gray-200 mb-4 z-10'>GitHub Activity</h1>
      <GitHubCalendar username="roismohammed" colorScheme="light" />
    </div>
  );
}
