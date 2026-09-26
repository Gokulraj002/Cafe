import { chapterNotes } from '@/data/content';

/**
 * The gallery around the film: the museum label beside the print, the scroll
 * cue, and the note that surfaces while the rosetta forms. The timeline fades
 * each of them in or out; without motion only the film and copy remain.
 */
export default function MomentWall() {
  return (
    <>
      <div className="imm-seq__label">
        <p className="type-eyebrow mb-2">N° 04 — Now pouring</p>
        <p className="imm-seq__label-title mb-1">The pour</p>
        <p className="imm-seq__label-text mb-0">Eight seconds, one cup — played by your scroll.</p>
      </div>

      <div className="imm-seq__note">
        <p className="type-eyebrow mb-2">The rosetta</p>
        <p className="imm-seq__note-text mb-0">{chapterNotes.pour.fact}</p>
      </div>

      <p className="imm-seq__cue mb-0" aria-hidden="true">
        Scroll
      </p>
    </>
  );
}
