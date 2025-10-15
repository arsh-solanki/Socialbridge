// src/components/FilterSidebar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterSidebar = ({
  relevanceMin,
  onRelevanceChange,
  skills,
  onSkillsChange,
  experience,
  onExperienceChange,
  pool,
  onPoolChange,
  onClearFilters
}) => {
  const skillsList = ['Product Management', 'Data Science', 'Growth Marketing', 'Leadership'];
  const experienceLevels = ['Early Career', 'Mid-Level', 'Executive'];
  const poolOptions = ['Standard Pool', 'Premium Mentor Pool'];

  return (
    <div className="sticky-top" style={{ top: '1rem' }}>
      <h5 className="mb-3">Filters</h5>
      
      {/* AI Relevance Filter */}
      <div className="mb-4">
        <label className="form-label fw-bold">AI Relevance Score</label>
        <input
          type="range"
          className="form-range"
          min="70"
          max="100"
          value={relevanceMin}
          onChange={(e) => onRelevanceChange(parseInt(e.target.value))}
        />
        <small className="text-muted">{relevanceMin}+ Score</small>
      </div>

      {/* Expertise/Skills */}
      <div className="mb-4">
        <label className="form-label fw-bold">Expertise/Skills</label>
        {skillsList.map(skill => (
          <div key={skill} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={skill}
              id={`skill-${skill}`}
              onChange={(e) => onSkillsChange(skill, e.target.checked)}
              checked={skills.includes(skill)}
            />
            <label className="form-check-label" htmlFor={`skill-${skill}`}>
              {skill}
            </label>
          </div>
        ))}
      </div>

      {/* Experience Level */}
      <div className="mb-4">
        <label className="form-label fw-bold">Experience Level</label>
        {experienceLevels.map(level => (
          <div key={level} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value={level}
              id={`exp-${level}`}
              name="experience"
              onChange={(e) => onExperienceChange(e.target.value)}
              checked={experience === level}
            />
            <label className="form-check-label" htmlFor={`exp-${level}`}>
              {level}
            </label>
          </div>
        ))}
      </div>

      {/* Mentor Pool */}
      <div className="mb-4">
        <label className="form-label fw-bold">Mentor Pool</label>
        {poolOptions.map(p => (
          <div key={p} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={p}
              id={`pool-${p}`}
              onChange={(e) => onPoolChange(p, e.target.checked)}
              checked={pool.includes(p)}
            />
            <label className="form-check-label" htmlFor={`pool-${p}`}>
              {p}
            </label>
          </div>
        ))}
      </div>

      <button className="btn btn-outline-secondary w-100 mb-2" onClick={onClearFilters}>
        Clear All Filters
      </button>
      <button className="btn btn-primary w-100">Apply Filters</button>
    </div>
  );
};

export default FilterSidebar;