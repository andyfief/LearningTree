const prompts = {
  getPrerequisites: (topic) => `The following prompt references "[Topic]". Set Topic = ${topic}. 
            Give 3 prerequisites that somebody wanting to learn about [Topic] would need to know. 
            They should be directly related to [Topic], and one step simpler.  
            Respond with only the prerequisite titles in the format "{Prerequisite} {Prerequisite} {Prerequisite}", 
            including the curly braces and not the double quotations. 
            Each prerequisite should be specific enough to clearly relate to [Topic] when used in a follow-up question. 
            If the prerequisites are vague enough to relate to a similar topic, add "In [Topic]" to {Prerequisite}. 
            If the topic is mentioned previously in the prerequisite, do not add this suffix.`,
};

export default prompts;
