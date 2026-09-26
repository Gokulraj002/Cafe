import { team } from '@/data/content';
import SwipeRail from '@/components/mobile/SwipeRail';

/** The one question each person was asked; the answer is their line in data/content.js. */
const QUESTIONS = {
  elodie: 'When is a roast finished?',
  tomas: 'What does the last shot of the day deserve?',
  noor: 'What does a croissant really need?',
  daniel: 'What is the one rule of the floor?',
};

const tenure = (years) => `${years} ${years === 1 ? 'year' : 'years'} with the house`;

/**
 * "In conversation" — a one-question interview with each of the four people
 * behind the bar. A swipe rail on phones and tablets, four columns on desktop.
 */
export default function TeamInterview() {
  return (
    <div className="ed-interview">
      <div className="container">
        <header className="ed-subhead">
          <p className="type-eyebrow mb-0">In conversation</p>
          <h3 className="ed-subhead__title">Four people, one question each.</h3>
        </header>
      </div>

      <SwipeRail label="Interviews with the team" className="ed-interview__rail ed-grid-rail">
        {team.map((member) => (
          <article key={member.id} className="ed-qa">
            <header className="ed-qa__header">
              <span className="ed-qa__initial" aria-hidden="true">
                {member.name.charAt(0)}
              </span>
              <div>
                <h4 className="ed-qa__name">{member.name}</h4>
                <p className="ed-qa__role mb-0">{member.role}</p>
              </div>
            </header>
            <p className="ed-qa__question mb-0">{QUESTIONS[member.id]}</p>
            <blockquote className="ed-qa__answer mb-0">
              <p className="mb-0">“{member.philosophy}”</p>
            </blockquote>
            <p className="ed-qa__tenure mb-0">{tenure(member.years)}</p>
          </article>
        ))}
      </SwipeRail>
    </div>
  );
}
