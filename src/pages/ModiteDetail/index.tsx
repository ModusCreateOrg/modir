import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Back from '../../components/Back'
import GitHub from '../../components/GitHub'
import ModiteImage from '../../components/ModiteImage'
import ProjectList from '../../components/ProjectList'
import Skype from '../../components/Skype'
import Time from '../../components/Time'
import { useParams } from '../../hook/useRouter'
import Modite from '../../models/Modite'
import Project from '../../models/Project'
import { useData } from '../../service/Data'
import { ContextArray as GlobalContextArray, useGlobal } from '../../service/Global'
import { ContextArray as MapContextArray, useMap } from '../../service/Map'
import { DataState } from '../../types/service/Data'
import s from './styles.module.scss'

const latitudeDiff = -5.5

const ModiteDetail = () => {
  const [{ modites, projects }]: [DataState] = useData()
  const [globalState, setGlobalState]: GlobalContextArray = useGlobal()
  const [viewport, setViewport]: MapContextArray = useMap()
  const { id } = useParams()
  const modite = modites.find((modite: Modite): boolean => modite.id === id)

  if (!modite) {
    return <Redirect to="/" />
  }

  const moditeProjects: Project[] = projects.reduce((matches: Project[], project: Project) => {
    if (project.users && project.users.find((user: Modite) => user.id === id)) {
      matches.push(project)
    }

    return matches
  }, [])

  const { profile = {}, real_name: name, tacos }: Modite = modite
  const { fields = {}, title } = profile
  const { Location, Title, 'GitHub User': gitHubUser, 'Skype User': skypeUser } = fields

  useEffect(() => {
    const locationData = modite.profile && modite.profile.fields && modite.profile.fields.locationData
    const newViewport = locationData
      ? {
          ...viewport,
          latitude: locationData.lat + latitudeDiff,
          longitude: locationData.lon,
          modite,
          zoom: 5,
        }
      : {
          ...viewport,
          modite: undefined,
        }

    setGlobalState({
      ...globalState,
      headerHidden: true,
      searchBarHidden: true,
    })

    setViewport(newViewport)
  }, [modite])

  return (
    <>
      <Back />
      <div className={s.detailContainer}>
        <ModiteImage className={s.thumbContainer} modite={modite} />

        <div className={s.detailInnerContainer}>
          <div className={s.tacos}>
            <span className={s.taco}>🌮</span>
            {tacos}
          </div>

          <div className={s.gitUser}>
            {gitHubUser ? <GitHub iconOnly name={gitHubUser} /> : null}
            {skypeUser ? <Skype iconOnly name={skypeUser} /> : null}
          </div>

          <h2 className={s.name}>{name}</h2>

          <div className={s.location}>{Location}</div>

          <div className={s.todWrap}>
            <Time modite={modite} date />
          </div>

          <div className={s.fieldTitle}>{Title}</div>

          <div className={s.slackName}>@{profile.display_name}</div>

          <div className={s.title}>{title}</div>

          <h4 className={s.projectHeader}>Projects</h4>
          {moditeProjects.length ? <ProjectList plain records={moditeProjects} /> : <div>No current projects</div>}
        </div>
      </div>
    </>
  )
}

export default ModiteDetail