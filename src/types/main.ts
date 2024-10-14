export interface Members {
    members: string;
    img: string;
    pic: string;
    presence: string;
    hp: string;
}

export interface FilterByFactory {
    all: Members[],
    f1: Members[],
    f2: Members[],
    f3: Members[],
    subproduct: Members[],
    project: Members[],
}

export interface FilterByPresence {
    all: Members[],
    present: Members[],
    absent: Members[]
}

export interface Factories {
    name: string;
    code: string;
}

export interface Presences {
    presence: string;
    code: string;
}