import AIChat from '../../components/dashboard/AIChat';
import { GlassCard } from '../../components/dashboard/SharedUI';

export default function StudentAI() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">AI Assistant</h1>
        <p className="text-dark-400 mt-1">Get learning tips and submission help</p>
      </div>
      <GlassCard hover={false} className="p-0 overflow-hidden">
        <AIChat />
      </GlassCard>
    </div>
  );
}
