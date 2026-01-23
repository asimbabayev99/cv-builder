'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tabs, { TabType } from '@/components/Tabs';
import TemplateGrid from '@/components/TemplateGrid';
import PreviewModal from '@/components/PreviewModal';
import { TEMPLATES_DATA, POPULAR_TEMPLATES, Template } from '@/data/templates';
import { COLORS_DATA, DEFAULT_COLOR, ColorOption } from '@/data/colors';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('popular');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(DEFAULT_COLOR);

  const templates = useMemo(() => {
    return activeTab === 'popular' ? POPULAR_TEMPLATES : TEMPLATES_DATA;
  }, [activeTab]);

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
  };

  return (
    <>
      <Header />

      <main className="main-content">
        <div className="container-fluid">
          <div className="choose-template-header">
            <h1 className="page-title">Choose a template</h1>
            <p className="page-subtitle">
              Pick from our collection of professionally designed templates
            </p>
          </div>

          <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

          <TemplateGrid templates={templates} onPreview={handlePreview} />
        </div>
      </main>

      <PreviewModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        colors={COLORS_DATA}
        selectedColor={selectedColor}
        onColorSelect={handleColorSelect}
      />

      <Footer />
    </>
  );
}
