import { Component, inject, input, output, signal } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Mission } from "@/app/interfaces/mission";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Transport } from "@/app/interfaces/transport";
import { MissionType } from "@/app/interfaces/mission-type";
import { MatChipGrid, MatChipListbox, MatChipOption, MatChipRow } from "@angular/material/chips";
import { MatOption, MatSelect } from "@angular/material/select";
import { single } from "rxjs";
import { MissionService } from "@/app/services/mission.service";

export type MissionModalData = {
    title: string;
    mission?: Mission;
    transports: Transport[];
    missionTypes: Pick<MissionType, "id" | "label">[];
}

@Component({
    selector: 'app-mission-modal',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatButton,
        MatDialogContent,
        MatDialogActions,
        MatChipGrid,
        MatChipRow,
        MatChipOption,
        MatChipListbox,
        MatSelect,
        MatOption
    ],
    templateUrl: './mission-modal.component.html',
    styleUrl: './mission-modal.component.scss'
})

export class MissionModalComponent {
    submitted = signal<boolean>(false);

    dialogRef = inject(MatDialogRef<MissionModalComponent>);
    data = inject<MissionModalData>(MAT_DIALOG_DATA);

    form: FormGroup = new FormGroup({
        startDate: new FormControl<Date | null>(null, Validators.required),
        endDate: new FormControl<Date | null>(null, Validators.required),
        startTown: new FormControl<string>("", Validators.required),
        endTown: new FormControl<string>("", Validators.required),
        transports: new FormControl<string[]>([], Validators.required),
        missionTypeId: new FormControl<string>("", Validators.required)
    });

    constructor(private missionService: MissionService) { }

    save() {}

    close() {
        this.dialogRef.close();
    }

    onSubmit(event: SubmitEvent) {
        this.submitted.set(true);
        event.preventDefault();

        if (this.form.valid) {
            console.log(this.form.value);

            const transportIds = this.form.value.transports.map((name: string) =>
                this.data.transports.find((transport) => transport.name === name)?.id
            ).filter((id: number | undefined) => id !== undefined);

            const options = {...this.form.value, transportIds,}

            this.missionService.createMission(options).subscribe({
                next: (mission) => {
                    this.dialogRef.close(mission);
                },
                error: (error) => {
                    console.error("Error while creating mission", error);
                }
            });
        } else {
            console.log("Form is invalid");
            this.form.markAllAsTouched();
        }
    }
}
