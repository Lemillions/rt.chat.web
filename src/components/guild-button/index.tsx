import { Guild } from "../../types/guild";
import './index.sass';
import { useState, useEffect } from "react";

export default function GuildButton({ guild, onClick }: { guild: Guild, onClick: (id: string) => void}) {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
    const [onHover, setOnHover] = useState(false);
    const [randomColor, setRandomColor] = useState('');

    useEffect(() => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        setRandomColor(color);
    }, []); 

    return (
        <div className="guild-button" 
            style={{ backgroundColor: randomColor }} 
            onClick={() => onClick(guild.id)} 
            onMouseEnter={() => setOnHover(true)} 
            onMouseLeave={() => setOnHover(false)}>
            {guild.name[0].toUpperCase()}
            {onHover && <div className="guild-button-popover">{guild.name}</div>}
        </div>
    );
}