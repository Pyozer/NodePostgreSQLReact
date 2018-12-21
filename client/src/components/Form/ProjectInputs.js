import React from 'react';
import { Input } from '.';

const ProjectInputs = ({ project }) => (
    <>
        <Input type="text" label="Name" name="name" placeholder="Name of project" defaultValue={project ? project.name : ''} />
        <Input type="text" label="Description" name="description" placeholder="Description of project" defaultValue={project ? project.description : ''} />
    </>
)

export default ProjectInputs;