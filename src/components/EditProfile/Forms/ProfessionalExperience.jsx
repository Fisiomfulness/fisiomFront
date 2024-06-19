import React from 'react';
import { Button } from '@nextui-org/react';
import { IoAddOutline } from 'react-icons/io5';
import ExperienceCard from '../ExperienceCard';

const ProfessionalExperience = ({ experiences = [] }) => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <h3>Experiencia</h3>
        <Button isIconOnly color="primary" size="sm" radius="full">
          <IoAddOutline size={24} />
        </Button>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <ExperienceCard key={exp._id} experience={exp} />
          ))
        ) : (
          <p>Aun no añadiste ninguna experiencia</p>
        )}
      </div>
    </section>
  );
};

export default ProfessionalExperience;
