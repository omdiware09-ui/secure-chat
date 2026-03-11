import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { InterfacePreviews, PlatformHighlights } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DesignPreviewPage() {
  const [previews, setPreviews] = useState<InterfacePreviews[]>([]);
  const [highlights, setHighlights] = useState<PlatformHighlights[]>([]);
  const [isLoadingPreviews, setIsLoadingPreviews] = useState(true);
  const [isLoadingHighlights, setIsLoadingHighlights] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [previewsResult, highlightsResult] = await Promise.all([
        BaseCrudService.getAll<InterfacePreviews>('interfacepreviews'),
        BaseCrudService.getAll<PlatformHighlights>('platformhighlights'),
      ]);
      
      const sortedPreviews = previewsResult.items.sort((a, b) => 
        (a.displayOrder || 0) - (b.displayOrder || 0)
      );
      
      setPreviews(sortedPreviews);
      setHighlights(highlightsResult.items);
    } catch (error) {
      console.error('Failed to load design data:', error);
    } finally {
      setIsLoadingPreviews(false);
      setIsLoadingHighlights(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[56rem] mx-auto text-center"
        >
          <h1 className="font-heading text-6xl md:text-7xl mb-8 text-primary">
            Design Preview
          </h1>
          <p className="text-xl text-foreground leading-relaxed">
            Minimalist privacy architecture inspired by Japanese Zen gardens and Dieter Rams' 
            principles. Less, but better. Every element serves a singular purpose.
          </p>
        </motion.div>
      </section>

      {/* Design Philosophy */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-primary text-center">
            Design Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[80rem] mx-auto">
            <div className="p-8">
              <h3 className="font-heading text-2xl mb-4 text-primary">Monochromatic Purity</h3>
              <p className="text-base text-foreground leading-relaxed">
                Strictly monochromatic palette using shades of black, white, and grey. 
                A single accent color reserved for critical interactive elements. 
                Color used sparingly to maintain visual clarity.
              </p>
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl mb-4 text-primary">Typography as Ornament</h3>
              <p className="text-base text-foreground leading-relaxed">
                Single highly legible sans-serif font. Hierarchy achieved through size, 
                weight, and case variations. Typography is the primary visual element.
              </p>
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl mb-4 text-primary">Extreme Negative Space</h3>
              <p className="text-base text-foreground leading-relaxed">
                Generous whitespace creates breathing room and reinforces calm. 
                Not empty space—intentional, functional space that enhances focus.
              </p>
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl mb-4 text-primary">Functional Components</h3>
              <p className="text-base text-foreground leading-relaxed">
                UI elements defined by placement and typography. No decorative styling, 
                borders, shadows, or textures. Subtle animations only for state changes.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Platform Highlights */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-6 text-primary">
            Platform Highlights
          </h2>
        </motion.div>

        <div className="min-h-[30rem]">
          {isLoadingHighlights ? (
            <div className="flex items-center justify-center py-24">
              <LoadingSpinner />
            </div>
          ) : highlights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-8 ${highlight.isFeatured ? 'border-2 border-accent' : 'border border-secondary/20'}`}
                >
                  {highlight.icon && (
                    <div className="mb-6">
                      <Image
                        src={highlight.icon}
                        alt={highlight.title || 'Platform highlight'}
                        width={64}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  )}
                  <h3 className="font-heading text-2xl mb-4 text-primary">
                    {highlight.title}
                  </h3>
                  {highlight.shortSummary && (
                    <p className="text-lg text-accent mb-4">
                      {highlight.shortSummary}
                    </p>
                  )}
                  <p className="text-base text-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg text-secondary">No highlights available at this time.</p>
            </div>
          )}
        </div>
      </section>

      {/* Interface Previews */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-6 text-primary">
            Interface Mockups
          </h2>
          <p className="text-lg text-foreground max-w-[48rem] mx-auto">
            Instagram-inspired messaging layout with left sidebar for chats and main 
            conversation panel. Minimal, distraction-free, privacy-focused.
          </p>
        </motion.div>

        <div className="min-h-[40rem]">
          {isLoadingPreviews ? (
            <div className="flex items-center justify-center py-24">
              <LoadingSpinner />
            </div>
          ) : previews.length > 0 ? (
            <div className="space-y-16">
              {previews.map((preview, index) => (
                <motion.div
                  key={preview._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`${index % 2 === 0 ? '' : 'md:flex-row-reverse'} md:flex gap-12 items-center`}
                >
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    {preview.mockupImage && (
                      <div className={`overflow-hidden border border-secondary/20 ${preview.darkModeEnabled ? 'bg-background' : 'bg-primary'}`}>
                        <Image
                          src={preview.mockupImage}
                          alt={preview.previewTitle || 'Interface preview'}
                          width={800}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2">
                    {preview.section && (
                      <span className="text-sm text-accent mb-4 block uppercase tracking-wider">
                        {preview.section}
                      </span>
                    )}
                    <h3 className="font-heading text-3xl mb-6 text-primary">
                      {preview.previewTitle}
                    </h3>
                    <p className="text-base text-foreground leading-relaxed">
                      {preview.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg text-secondary">No interface previews available at this time.</p>
            </div>
          )}
        </div>
      </section>

      {/* Design Principles */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[64rem] mx-auto text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-8 text-primary">
            Less, But Better
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            Every pixel serves a purpose. No decoration for decoration's sake. 
            The interface becomes transparent, allowing your conversations to take center stage.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            This is not minimalism as a trend. This is minimalism as a commitment to clarity, 
            focus, and respect for your attention.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
