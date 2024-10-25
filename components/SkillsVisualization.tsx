/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

interface Skill {
    name: string;
    level: number;
    projects: number;
    experience: string;
}

const SkillsVisualization = () => {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const skills: Skill[] = [
    { name: "React", level: 85, projects: 6, experience: "1.2 years" },
    { name: "TypeScript", level: 80, projects: 14, experience: "1.5 years" },
    { name: "NextJS", level: 75, projects: 4, experience: "11 months" },
    { name: "UI/UX", level: 70, projects: 8, experience: "10 months" },
    { name: "Node.js", level: 65, projects: 17, experience: "1.6 year" },
    { name: "Machine Learning", level: 72, projects: 3, experience: "0.4 years" },
    { name: "Backend", level: 85, projects: 5, experience: "1.3 years"},
    { name: "Testing", level: 60, projects: 4, experience: "4 months" },
  ];

  return (
    <div className="w-full max-w-4xl p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Technical Proficiency</h2>

      <div className="bg-gray-50 rounded-lg p-6">
        <RadarChart width={500} height={400} data={skills}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            name="Skill Level"
            dataKey="level"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            onMouseEnter={(_: any, __: any, event: { activeTooltipIndex: any; }) => {
              const index = event?.activeTooltipIndex;
              if (index !== undefined) {
                setActiveSkill(skills[index]);
              }
            }}
            onMouseLeave={() => setActiveSkill(null)}
          />
          <Tooltip />
        </RadarChart>

        {activeSkill && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="font-bold text-lg">{activeSkill.name}</h3>
            <p className="text-gray-600">Projects: {activeSkill.projects}</p>
            <p className="text-gray-600">
              Experience: {activeSkill.experience}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsVisualization;
