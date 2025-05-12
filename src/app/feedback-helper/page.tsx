'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function FeedbackForm() {
  const [role, setRole] = useState('');
  const [projects, setProjects] = useState<string[]>([]);
  const [focusArea, setFocusArea] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleProject = (project: string) => {
    setProjects(prev =>
      prev.includes(project)
        ? prev.filter(p => p !== project)
        : [...prev, project]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('https://4stkggdsmtx5bjdh5dwt5tt6ee0maujz.lambda-url.ap-south-1.on.aws/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projects: projects.join(', '),
        role,
        focusArea,
      })
    });

    const data = await response.json();
    const feedback = encodeURIComponent(data.feedback);
    const subject = encodeURIComponent('Feedback for Advay');
    const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=advay.rajhansa@thoughtworks.com&su=${subject}&body=${feedback}`;

    setLoading(false);
    window.location.href = mailto;
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Share your feedback with me</h2>

      <div className="text-gray-700 dark:text-gray-300">

      <p className="mt-4 mb-4">
        Help me grow by sharing your feedback based on your experience working with me.
        This tool will assist you in drafting your feedback using AI — making it quick and easy.
      </p>

      <p className="mt-4 mb-4">
        The tool will generate a draft using AI, which will open in your Gmail.
        You can review and edit the email before sending it.
      </p>

      </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-gray-800 dark:text-gray-200">
            <div>
              <Label className="mb-4 block">Your role in working with me</Label>
              <RadioGroup value={role} onValueChange={setRole} className="">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Peer" id="role-peer" />
                  <Label htmlFor="role-peer">Peer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Lead" id="role-lead" />
                  <Label htmlFor="role-lead">Lead</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Manager" id="role-manager" />
                  <Label htmlFor="role-manager">Manager</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Which project(s) did you work on with me?</Label>
              <div className="mt-2">
                {['KLI', 'HLI'].map((project) => (
                  <label key={project} className="flex items-center space-x-2">
                    <Checkbox
                      checked={projects.includes(project)}
                      onCheckedChange={() => toggleProject(project)}
                    />
                    <span>{project}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Optional: What should the feedback focus on?</Label>
              <Textarea
                placeholder="e.g. Communication, automation, leadership..."
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button type="submit" disabled={loading || !role || projects.length === 0} className="px-6">
              {loading ? 'Generating feedback...' : 'Generate Feedback & Draft Email'}
            </Button>
          </form>

      <p className="mt-8 mb-4">
        Your honest input is appreciated and helps me improve and continue contributing effectively.
        Let’s make feedback easier and more meaningful!
      </p>
    </div>
  );
}
