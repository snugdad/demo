class ValidationType {
	public static readonly ERROR: ValidationType = new ValidationType(1);
	public static readonly WARNING: ValidationType = new ValidationType(2);
	public static readonly INFO: ValidationType = new ValidationType(3);

	private readonly _value: number;

	private constructor(value: number) {
		this._value = value;
	}

	public get value() {
		return this._value;
	}
}

type ContainerID = {
    id: string,
    key: string,
    title: string,
}

type SerializedProps = {
    [propName: string]: object
}

type ActionGroupsConfig = {
    index: string[],
    groups: {
        [group: string]: string[]
    }
}

type HttpClientConfig = {
    baseURL?: string,
    params: any,
}
type CollectionConfig = {
    httpClient?: HttpClientConfig,
    resourceID: string,
    params: any, 
}

type ReactComponentConfig = {
    type: string,
    serProps: SerializedProps,
}

type ValidationConfig = {
    validators: string[]
}

type ContainerStartupState = {
    containerID: ContainerID,
    actionGroups?: ActionGroupsConfig,
    collection?: CollectionConfig
    view?: ReactComponentConfig,
    validation?: ValidationConfig,
}

export { 
    ActionGroupsConfig,
    CollectionConfig,
    ContainerID,
    ContainerStartupState,
    HttpClientConfig,
    ReactComponentConfig,
    SerializedProps,
    ValidationType,
}