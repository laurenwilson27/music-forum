const AvatarSelect = ({ avatar, setAvatar }) => {
  return (
    <div className="avatarForm">
      <label htmlFor="avatarSelect">
        <b>Avatar</b>
      </label>
      <select
        id="avatarSelect"
        title="Avatar Selection"
        value={avatar}
        onChange={(e) => {
          setAvatar(e.target.value);
        }}
      >
        <option value="" disabled>
          Select Avatar
        </option>
        <option value="acoustic.png">Acoustic</option>
        <option value="georgestreet.png">George Street Festival</option>
        <option value="metal.png">Metal Concert</option>
        <option value="rapids.png">Rapids</option>
        <option value="rockstar.png">Rockstar</option>
        <option value="signalhill.png">Signal Hill</option>
        <option value="stage.png">Stage</option>
        <option value="doge.png">Doge</option>
        <option value="treble.png">Treble Clef</option>
      </select>
      {avatar !== "" && (
        <img
          src={`avatars/${avatar}`}
          alt="User avatar"
          width="128px"
          height="128px"
        />
      )}
    </div>
  );
};

export default AvatarSelect;
