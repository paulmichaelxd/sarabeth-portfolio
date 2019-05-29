import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { uid } from 'react-uid';
import Title from '../common/Title';
import Filters from '../common/Filters';
import Song from './SongEntry';

const AudioSection = (props) => {
  const { audioGroups } = props;
  const [currentGroup, setGroup] = useState('All');

  const getAudioGroups = () => {
    const groups = audioGroups.map(group => group.label);

    groups.unshift('All');
    return groups;
  };

  const getAudioFiles = () => {
    let files = [];

    if (currentGroup === 'All') {
      audioGroups.forEach((group) => {
        files = [...files, ...group.audioFiles];
      });
    } else {
      const audioGroup = audioGroups.find(
        group => group.label === currentGroup,
      );
      files = audioGroup.audioFiles;
    }

    return files.filter(
      audioFile => audioFile && audioFile.title && audioFile.audio.file.url,
    );
  };

  return (
    <React.Fragment>
      <Title>Audio</Title>

      {audioGroups.length > 1 && (
        <Filters
          list={getAudioGroups()}
          activeItem={currentGroup}
          onClick={item => setGroup(item)}
        />
      )}

      {getAudioFiles().map(audio => (
        <Song
          key={uid(audio)}
          title={audio.title}
          subtitle={audio.subtitle}
          url={audio.audio.file.url}
        />
      ))}
    </React.Fragment>
  );
};

AudioSection.propTypes = {
  audioGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default () => (
  <StaticQuery
    query={graphql`
      query AudioGroupQuery {
        allContentfulAudioGroups(sort: { fields: [label], order: ASC }) {
          edges {
            node {
              label
              audioFiles {
                title
                subtitle
                audio {
                  file {
                    url
                    fileName
                    contentType
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <AudioSection
        audioGroups={data.allContentfulAudioGroups.edges.map(item => item.node)}
      />
    )}
  />
);
