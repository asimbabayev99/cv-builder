'use client';

import { ColorGroup, ColorOption } from '@/data/colors';
import styles from './ColorPalette.module.css';

interface ColorPaletteProps {
  colors: ColorGroup[];
  selectedColor: ColorOption;
  onColorSelect: (color: ColorOption) => void;
}

export default function ColorPalette({ colors, selectedColor, onColorSelect }: ColorPaletteProps) {
  const isWhite = (color: string) => color.toUpperCase() === '#FFFFFF';

  return (
    <div className={styles.colorPaletteSection}>
      <h3 className={styles.colorSectionTitle}>Choose colour</h3>
      <div className={styles.colorPalette}>
        {colors.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.colorGroup}>
            <div className={styles.colorGroupMain}>
              <div
                className={`${styles.colorOption} ${styles.mainColor} ${
                  selectedColor.color === group.mainColor.color ? styles.active : ''
                } ${isWhite(group.mainColor.color) ? styles.whiteColor : ''}`}
                style={{ backgroundColor: group.mainColor.color }}
                title={group.mainColor.label}
                onClick={() => onColorSelect(group.mainColor)}
              />
            </div>
            <div className={styles.subColors}>
              {group.subColors.map((subColor, subIndex) => (
                <div
                  key={subIndex}
                  className={`${styles.colorOption} ${styles.subColor} ${
                    selectedColor.color === subColor.color ? styles.active : ''
                  }`}
                  style={{ backgroundColor: subColor.color }}
                  title={subColor.label}
                  onClick={() => onColorSelect(subColor)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
