import cafe from '@/data/cafe';
import Button from '@/components/common/Button';
import MaskedLines from './MaskedLines';

const INVITATION = [['Your table', 'is waiting.']];

/**
 * The last beat of the sequence. Below lg the button opens the shared
 * reservation sheet (`data-reserve-sheet`); from lg up it scrolls to #reserve.
 * The timeline animates the wrappers, never the button, so the button keeps
 * its own press feedback.
 */
export default function MomentInvitation() {
  return (
    <div className="imm-seq__finale">
      <div className="imm-seq__finale-copy">
        <p className="imm-seq__reveal type-eyebrow mb-0">
          Reservations · {cafe.seats} seats
        </p>
        <h2 className="imm-seq__invite">
          <MaskedLines sentences={INVITATION} />
        </h2>
      </div>
      <div className="imm-seq__reveal imm-seq__action">
        <Button href="#reserve" variant="light" arrow className="imm-seq__cta" data-reserve-sheet>
          Reserve a table
        </Button>
      </div>
    </div>
  );
}
