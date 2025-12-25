import { motion } from 'framer-motion';

export const CreditsSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-32">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://static-assets.everpurple.kr/history/ine_history_title_c.png"
            alt="INE History"
            className="mx-auto h-auto w-48 opacity-60 md:w-64"
          />
        </motion.div>

        <motion.p
          className="mb-4 font-body text-lg text-foreground md:text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          감사합니다
        </motion.p>

        <motion.p
          className="font-body text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Thank you for experiencing INE History
        </motion.p>

        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-muted-foreground">
            Clone coding project
          </p>
          <p className="text-xs text-muted-foreground">
            Original: everpurple.kr/ine
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
