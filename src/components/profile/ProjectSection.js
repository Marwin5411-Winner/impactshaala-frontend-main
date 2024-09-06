import ProjectCard from "./ProjectCard"

const ProjectSection = ({
   ongoing = false,
   myProfile = false,
}) => {
	return (
		<>
         <ProjectCard name="1" isCompleted ongoing={ongoing} myProfile={myProfile}/>
         <ProjectCard name="2" ongoing={ongoing} myProfile={myProfile}/>
         <ProjectCard name="3" ongoing={ongoing} myProfile={myProfile}/>
         <ProjectCard name="4" isCompleted ongoing={ongoing} myProfile={myProfile}/>
         <ProjectCard name="5" ongoing={ongoing} myProfile={myProfile}/>
		</>
	)
}

export default ProjectSection