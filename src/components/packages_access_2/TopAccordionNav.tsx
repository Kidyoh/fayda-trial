import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface TopAccordionNavProps {
  materials: any[];
  activeMaterialId: string;
  onMaterialClick: (materialId: any, materialType: any, materialAccess: any) => void;
  studentId?: string;
  courseProgress?: number;
}

const partNames = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

function groupByUnitAndPart(materials: any[]) {
  const units: { [unit: string]: { [part: string]: any[] } } = {};
  materials.forEach((material) => {
    const unit = material.unit || material.unitTitle || '1';
    const title = material?.video?.vidTitle || material?.assementId?.assesmentTitle || material?.file?.title || material?.link?.title || '';
    let partKey = '1';
    if (title) {
      const partMatch = title.match(/part\s+(\w+)/i);
      if (partMatch) {
        partKey = partMatch[1].toLowerCase();
        switch (partKey) {
          case 'one': partKey = '1'; break;
          case 'two': partKey = '2'; break;
          case 'three': partKey = '3'; break;
          case 'four': partKey = '4'; break;
          case 'five': partKey = '5'; break;
          case 'six': partKey = '6'; break;
          case 'seven': partKey = '7'; break;
          case 'eight': partKey = '8'; break;
          case 'nine': partKey = '9'; break;
          case 'ten': partKey = '10'; break;
          default:
            if (!/^\d+$/.test(partKey)) partKey = '1';
        }
      }
    }
    if (!units[unit]) units[unit] = {};
    if (!units[unit][partKey]) units[unit][partKey] = [];
    units[unit][partKey].push(material);
  });
  return units;
}

const TopAccordionNav: React.FC<TopAccordionNavProps> = ({
  materials,
  activeMaterialId,
  onMaterialClick,
  studentId = "",
  courseProgress = 0,
}) => {
  const grouped = groupByUnitAndPart(materials);
  const sortedUnits = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="w-full lg:w-1/2 mb-4">
      {/* Progress Bar Component */}
      <div className="bg-white rounded-xl border border-[#bf8c13]/20 p-4 mb-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#07705d]">Course Progress</h3>
          <span className="text-2xl font-bold text-[#bf8c13]">{courseProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-[#07705d] to-[#bf8c13] h-3 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${courseProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {courseProgress === 100 
            ? "🎉 Congratulations! Course completed!" 
            : courseProgress > 75 
            ? "Almost there! Keep going!" 
            : courseProgress > 50 
            ? "Great progress! You're halfway there!" 
            : courseProgress > 25 
            ? "Good start! Keep learning!" 
            : "Start your learning journey!"
          }
        </p>
      </div>

      {/* Navigation Accordion */}
      <Accordion type="single" collapsible className="w-full">
      {sortedUnits.map((unit) => (
        <AccordionItem key={unit} value={`unit-${unit}`} className="border rounded-lg bg-white mb-2">
          <AccordionTrigger className="px-4 py-3 font-bold text-[#07705d] text-base md:text-lg">
            Unit {unit}
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-2">
            <Accordion type="single" collapsible>
              {Object.keys(grouped[unit]).sort((a, b) => parseInt(a) - parseInt(b)).map((part) => (
                <AccordionItem key={part} value={`part-${part}`} className="border rounded-lg bg-white mb-2">
                  <AccordionTrigger className="px-4 py-2 font-semibold text-[#07705d] text-sm md:text-base">
                    Part {partNames[parseInt(part) - 1] || part}
                    <span className="ml-2 text-xs text-gray-500">{grouped[unit][part].length} materials</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-2 flex flex-col gap-2">
                    {grouped[unit][part].map((material: any) => (
                      <button
                        key={material.id}
                        onClick={() => onMaterialClick(material.id, material.materialType, material.Access)}
                        className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 text-xs md:text-sm font-medium flex items-center gap-2
                          ${material.id === activeMaterialId ? 'bg-gradient-to-r from-[#07705d] to-[#bf8c13] text-white border-transparent shadow-md' : 'hover:bg-[#c7cc3f]/10 text-gray-700 border-transparent hover:border-[#c7cc3f]/30'}
                          ${material.Access === "locked" ? 'opacity-60' : ''}`}
                        disabled={material.Access === "locked"}
                      >
                        {material.materialType === "file" && "Note: "}
                        {material.materialType === "video" && "Video: "}
                        {material.materialType === "assessment" && "Assessment: "}
                        {material.materialType === "link" && "Link: "}
                        {material?.video?.vidTitle || material?.assementId?.assesmentTitle || material?.file?.title || material?.link?.title || `Part ${part} ${material.materialType}`}
                      </button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
      </Accordion>
    </div>
  );
};

export default TopAccordionNav;
