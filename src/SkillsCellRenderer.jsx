import React from 'react';
import RefData from './RefData';

export default class SkillsCellRenderer extends React.Component {

    render() {
        var skills = [];
        RefData.IT_SKILLS.forEach( (skill) => {
            if (this.props.skills[skill]) {
                skills.push(<img key={skill} src={'images/skills/' + skill + '.png'} width={16} title={skill} />);
            }
        });

        return <span>{skills}</span>;
    }

}

SkillsCellRenderer.propTypes = {
    skills: React.PropTypes.object
};