const prompts = {
  getPrerequisites: (
    topic,
    rootTopic
  ) => `The following prompt references "[Topic]" and "[RootTopic]". Set Topic = ${topic} and RootTopic = ${rootTopic}.
            It is possible that Topic and RootTopic are the same.
            Give 3 prerequisites that somebody wanting to learn about [Topic] would need to know. 
            They should directly contribute to understanding [rootTopic], and be one step simpler than [Topic]. 
            Avoid prerequisites that are too broad or only loosely related to [RootTopic]. 
            Each prerequisite must be a clear and necessary step toward understanding [Topic] **in the context of** [RootTopic]. 
            Respond with only the prerequisite titles in the format "{Prerequisite} {Prerequisite} {Prerequisite}", 
            including the curly braces and not the double quotations. 
            Each prerequisite should be specific enough to clearly relate to [rootTopic] when used in a follow-up question.`,
};

export default prompts;

/* The following prompt references "[Topic]" and "[RootTopic]". Set Topic = ${topic} and RootTopic = ${rootTopic}.
It is possible that Topic and RootTopic are the same.

Provide exactly **three** prerequisite topics that someone should learn **before** understanding [Topic].
Each prerequisite must be **one step simpler than** [Topic] but **directly contribute** to understanding [RootTopic].
Avoid prerequisites that are too broad or only loosely related to [RootTopic].

**Example Format:**  
{Prerequisite 1} {Prerequisite 2} {Prerequisite 3}

Each prerequisite must be a clear and necessary step toward understanding [Topic] **in the context of** [RootTopic]. 


The following prompt references "[Topic]" and "[RootTopic]". Set Topic = ${topic} and RootTopic = ${rootTopic}.
            It is possible that Topic and RootTopic are the same.
            Give 3 prerequisites that somebody wanting to learn about [Topic] would need to know. 
            They should be directly related to [rootTopic], and one step simpler than [Topic].  
            Respond with only the prerequisite titles in the format "{Prerequisite} {Prerequisite} {Prerequisite}", 
            including the curly braces and not the double quotations. 
            Each prerequisite should be specific enough to clearly relate to [rootTopic] when used in a follow-up question.
*/
