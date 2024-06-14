import { Guild } from '../../types/guild';
import GuildButton from '../guild-button';
import './index.sass'

export default function SideBar({ guilds, openModal, selectGuild }: { guilds: Guild[], openModal: () => void, selectGuild: (id: string) => void}) {
    return (
        <div className="side-bar">
            {guilds.map((guild) => (
                <GuildButton guild={guild} key={guild.id} onClick={selectGuild}/>
            ))}
            <div className="guild-button" style={{ backgroundColor: '#4f4f4f', color: '#00e025', borderRadius: '50%' }} onClick={() => openModal()}>
                +
            </div>
        </div>
    );
}